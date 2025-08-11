// server/api/proyek_perubahan/summary_pelatihan.ts

import { proper } from '../../database/schema/proper'
import { pelatihan } from '../../database/schema/pelatihan'
import { db } from '../../db'
import { eq, sql } from 'drizzle-orm'

// GET: Summary proyek perubahan per pelatihan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const summaryData = await db
        .select({
          pelatihan_id: pelatihan.id,
          nama_program: pelatihan.nama,
          total_proyek: sql<number>`count(${proper.id})`,
          latest_update: sql<string>`max(${proper.createdAt}::text)`
        })
        .from(proper)
        .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
        .where(sql`${pelatihan.id} is not null`)  // Hanya tampilkan yang ada pelatihannya
        .groupBy(pelatihan.id, pelatihan.nama)
        .orderBy(pelatihan.nama)

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
