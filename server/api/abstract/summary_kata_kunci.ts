import { abstract } from '../../database/schema/abstract'
import { proper } from '../../database/schema/proper'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Join abstract → proper → instansi untuk mendapatkan kata kunci per instansi
      const data = await db
        .select({
          kata_kunci: abstract.kata_kunci,
          instansi_id: instansi.instansi_id,
          nama_instansi: instansi.nama_instansi,
          id_instansi_kategori: instansi.id_instansi_kategori,
          kategori_name: sql<string>`
            CASE 
              WHEN ${instansi.id_instansi_kategori} = 1 THEN 'Kementerian'
              WHEN ${instansi.id_instansi_kategori} = 2 THEN 'Lembaga'
              WHEN ${instansi.id_instansi_kategori} = 3 THEN 'Pemerintah Provinsi'
              WHEN ${instansi.id_instansi_kategori} = 4 THEN 'Pemerintah Kabupaten'
              WHEN ${instansi.id_instansi_kategori} = 5 THEN 'Pemerintah Kota'
              ELSE 'Lainnya'
            END
          `
        })
        .from(abstract)
        .leftJoin(proper, eq(abstract.proper_id, proper.id))
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .where(sql`${abstract.kata_kunci} IS NOT NULL AND ${instansi.instansi_id} IS NOT NULL`)

      // Kelompokkan kata kunci per instansi
      const instansiKeywords: Record<number, {
        instansi_id: number,
        nama_instansi: string,
        id_instansi_kategori: number | null,
        kategori_name: string,
        keywords: Record<string, number>
      }> = {}

      data.forEach(row => {
        if (!row.kata_kunci || !row.instansi_id) return
        
        // Inisialisasi data instansi jika belum ada
        if (!instansiKeywords[row.instansi_id]) {
          instansiKeywords[row.instansi_id] = {
            instansi_id: row.instansi_id,
            nama_instansi: row.nama_instansi || 'Unknown',
            id_instansi_kategori: row.id_instansi_kategori,
            kategori_name: row.kategori_name || 'Lainnya',
            keywords: {}
          }
        }

        let keywords: string[] = []
        // Jika array, langsung gunakan
        if (Array.isArray(row.kata_kunci)) {
          keywords = row.kata_kunci
        } else if (typeof row.kata_kunci === 'string') {
          // Bersihkan dari karakter array literal dan pisahkan
          const cleanString = row.kata_kunci
            .replace(/^\[\'?|\]$|\'$/g, '') // Hapus [' di awal dan '] di akhir
            .replace(/\'\s*,\s*\'/g, ',') // Hapus quote di sekitar koma
            .replace(/\'/g, '') // Hapus semua quote yang tersisa
          keywords = cleanString.split(/[,;]+/).map(k => k.trim()).filter(Boolean)
        }

        // Hitung frekuensi kata kunci untuk instansi ini
        keywords.forEach(keyword => {
          if (!keyword || !row.instansi_id) return
          const instansiData = instansiKeywords[row.instansi_id]
          instansiData.keywords[keyword] = (instansiData.keywords[keyword] || 0) + 1
        })
      })

      // Format hasil dan kelompokkan per kategori
      const instansiArray = Object.values(instansiKeywords).map(instansi => ({
        instansi_id: instansi.instansi_id,
        nama_instansi: instansi.nama_instansi,
        id_instansi_kategori: instansi.id_instansi_kategori,
        kategori_name: instansi.kategori_name,
        total_keywords: Object.keys(instansi.keywords).length,
        top_keywords: Object.entries(instansi.keywords)
          .map(([keyword, count]) => ({ keyword, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10) // Top 10 kata kunci per instansi
      }))

      // Kelompokkan per kategori
      const kategoris = [
        { id: 1, name: 'Kementerian' },
        { id: 2, name: 'Lembaga' },
        { id: 3, name: 'Pemerintah Provinsi' },
        { id: 4, name: 'Pemerintah Kabupaten' },
        { id: 5, name: 'Pemerintah Kota' }
      ]

      const summary = kategoris.map(kategori => {
        const instansiInKategori = instansiArray
          .filter(instansi => instansi.id_instansi_kategori === kategori.id)
          .sort((a, b) => b.total_keywords - a.total_keywords)

        return {
          kategori_id: kategori.id,
          kategori_name: kategori.name,
          total_instansi: instansiInKategori.length,
          total_keywords: instansiInKategori.reduce((sum, inst) => sum + inst.total_keywords, 0),
          instansi: instansiInKategori
        }
      }).filter(kategori => kategori.total_instansi > 0) // Hanya kategori yang punya instansi

      return { 
        success: true, 
        total_instansi: instansiArray.length,
        total_kategori: summary.length,
        summary 
      }
    }
    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
