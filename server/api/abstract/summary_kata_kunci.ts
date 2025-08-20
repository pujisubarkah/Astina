import { abstract } from '../../database/schema/abstract'
import { db } from '../../db'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Ambil semua kata_kunci dari tabel abstract
      const data = await db.select({ kata_kunci: abstract.kata_kunci }).from(abstract)
      const keywordCount: Record<string, number> = {}

      data.forEach(row => {
        if (!row.kata_kunci) return
        let keywords: string[] = []
        // Jika array, langsung gunakan
        if (Array.isArray(row.kata_kunci)) {
          keywords = row.kata_kunci
        } else if (typeof row.kata_kunci === 'string') {
          // Pisahkan dengan koma atau titik koma
          keywords = row.kata_kunci.split(/[,;]+/).map(k => k.trim()).filter(Boolean)
        }
        keywords.forEach(keyword => {
          if (!keyword) return
          keywordCount[keyword] = (keywordCount[keyword] || 0) + 1
        })
      })

      // Ubah ke array dan urutkan dari yang paling sering
      const summary = Object.entries(keywordCount)
        .map(([keyword, count]) => ({ keyword, count }))
        .sort((a, b) => b.count - a.count)

      return { success: true, summary }
    }
    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
