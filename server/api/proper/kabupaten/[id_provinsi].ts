// server/api/proper/kabupaten/[id_provinsi].ts

import { proper } from '@/server/database/schema/proper'
import { db } from '@/server/db'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const { instansi } = await import('@/server/database/schema/instansi')
      const { kabupaten } = await import('@/server/database/schema/kabupaten')

      // ambil param dari path
      const idProvinsi = Number(getRouterParam(event, 'id_provinsi'))

      // validasi
      if (!idProvinsi) {
        throw createError({ statusCode: 400, statusMessage: 'id_provinsi wajib diisi' })
      }

      const summaryData = await db
        .select({
          id_kabupaten: kabupaten.id,
          id_provinsi: kabupaten.id_provinsi,
          nama_kabupaten: kabupaten.nama,
          svg_path: kabupaten.svg_path,
          jumlah: sql`count(${proper.id})`
        })
        .from(kabupaten)
        .leftJoin(instansi, sql`${kabupaten.id} = ${instansi.id_kabupaten}`)
        .leftJoin(proper, sql`${instansi.instansi_id} = ${proper.instansiId}`)
        .where(sql`${kabupaten.id_provinsi} = ${idProvinsi}`)
        .groupBy(kabupaten.id, kabupaten.id_provinsi, kabupaten.nama, kabupaten.svg_path)

      return { success: true, data: summaryData }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Internal server error'
    })
  }
})
