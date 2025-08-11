// server/api/proyek_perubahan/summary_instansi.ts

import { proper } from '../../database/schema/proper'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { eq, sql } from 'drizzle-orm'

// GET: Summary proyek perubahan per instansi
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const summaryData = await db
        .select({
          instansi_id: instansi.instansiId,
          nama_instansi: instansi.namaInstansi,
          total_proyek: sql<number>`count(${proper.id})`,
          proyek_per_instansi: sql<number>`count(${proper.id})`
        })
        .from(proper)
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansiId))
        .groupBy(instansi.instansiId, instansi.namaInstansi)
        .orderBy(instansi.namaInstansi)

      return {
        success: true,
        data: summaryData
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
