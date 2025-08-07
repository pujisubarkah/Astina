// server/api/provinsi/index.ts

import { provinsi } from '@/server/database/schema/provinsi'
import { db } from '@/server/db'


// GET: Ambil semua data provinsi
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Select kolom sesuai schema
      const data = await db.select({
        id: provinsi.id,
        nama: provinsi.nama,
        svgPath: provinsi.svgPath,
        idProvinsi: provinsi.idProvinsi,
        createdAt: provinsi.createdAt
      }).from(provinsi)
      return { success: true, data }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
