// server/api/proper/index.ts

import { proper } from '@/server/database/schema/proper'
import { db } from '@/server/db'
import { sql } from 'drizzle-orm'
import { createError } from 'h3'

// GET: Ambil semua data proper
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Summary jumlah proper per instansi_id, join instansi dan kabupaten untuk dapat svg_path, id_provinsi, id_kabupaten
      const { instansi } = await import('@/server/database/schema/instansi')
      const { kabupaten } = await import('@/server/database/schema/kabupaten')
      const query = getQuery(event)
      const idProvinsi = query.id_provinsi ? Number(query.id_provinsi) : undefined

      let whereClause = undefined
      if (idProvinsi) {
        whereClause = sql`${kabupaten.id_provinsi} = ${idProvinsi}`
      }

      const summaryData = await db
        .select({
          id_provinsi: kabupaten.id_provinsi,
          id_kabupaten: kabupaten.id,
          svg_path: kabupaten.svg_path,
          jumlah: sql`count(${proper.id})`
        })
        .from(proper)
        .leftJoin(instansi, sql`${proper.instansiId} = ${instansi.instansi_id}`)
        .leftJoin(kabupaten, sql`${instansi.id_kabupaten} = ${kabupaten.id}`)
        .where(whereClause)
        .groupBy(kabupaten.id_provinsi, kabupaten.id, kabupaten.svg_path)
      return { success: true, data: summaryData }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})