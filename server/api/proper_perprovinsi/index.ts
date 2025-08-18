import { proper } from '../../database/schema/proper'
import { instansi } from '@/server/database/schema/instansi'
import { provinsi } from '@/server/database/schema/provinsi'
import { db } from '@/server/db'
import { sql } from 'drizzle-orm'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Join instansi with provinsi to get svgPath
    const data = await db
      .select({
        id_provinsi: instansi.id_provinsi,
        jumlah_proper: sql`COUNT(${proper.id})`,
        svg_path: provinsi.svgPath,
        nama_provinsi: provinsi.nama,
      })
      .from(proper)
      .leftJoin(instansi, sql`${proper.instansiId} = ${instansi.instansi_id}`)
      .leftJoin(provinsi, sql`${instansi.id_provinsi} = ${provinsi.idProvinsi}`)
      .groupBy(instansi.id_provinsi, provinsi.svgPath, provinsi.nama)
    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gagal mengambil data',
    }
  }
})
