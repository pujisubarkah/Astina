// server/api/alumni/gender.ts

import { proper } from '@/server/database/schema/proper'
import { db } from '@/server/db'

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  }

  try {
    const rows = await db.select({ noIdentitas: proper.noIdentitas }).from(proper)

    const summary = { Pria: 0, Wanita: 0, TidakDiketahui: 0 }

    for (const row of rows) {
      const nik = row.noIdentitas?.toString().trim() || ''
      if (nik.length >= 16) {
        const digit15 = nik.charAt(14)
        if (digit15 === '1') summary.Pria++
        else if (digit15 === '2') summary.Wanita++
        else summary.TidakDiketahui++
      } else {
        summary.TidakDiketahui++
      }
    }

    return { success: true, data: summary }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil data gender' })
  }
})