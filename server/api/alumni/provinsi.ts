// server/api/alumni/provinsi.ts

import { proper } from '@/server/database/schema/proper'
import { lemdik } from '@/server/database/schema/lemdik'
import { provinsi } from '@/server/database/schema/provinsi'
import { db } from '@/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  }

  try {
    const rows = await db
      .select({
        namaProvinsi: provinsi.nama,
        svgPath: provinsi.svgPath,
        noIdentitas: proper.noIdentitas,
      })
      .from(proper)
      .leftJoin(lemdik, eq(proper.lemdikId, lemdik.id))
      .leftJoin(provinsi, eq(lemdik.provinsiId, provinsi.id))

    const currentYear = new Date().getFullYear()
    const summary: Record<string, { total: number; pria: number; wanita: number; svgPath: string | null }> = {}

    for (const row of rows) {
      const key = row.namaProvinsi || 'Unknown'
      if (!summary[key]) {
        summary[key] = {
          total: 0,
          pria: 0,
          wanita: 0,
          svgPath: row.svgPath,
        }
      }

      summary[key].total++

      const nik = row.noIdentitas?.toString().trim() || ''
      if (nik.length >= 16) {
        const digit15 = nik.charAt(14)
        if (digit15 === '1') summary[key].pria++
        else if (digit15 === '2') summary[key].wanita++
      }
    }

    return { success: true, data: summary }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil data per provinsi' })
  }
})