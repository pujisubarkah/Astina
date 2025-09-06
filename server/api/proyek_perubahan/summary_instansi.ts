// server/api/proyek_perubahan/summary_instansi.ts

import { proper } from '../../database/schema/proper'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { eq, sql } from 'drizzle-orm'

// GET: Summary proyek perubahan per kategori instansi
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Group by kategori instansi dulu
      const summaryByCategory = await db
        .select({
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
          `,
          total_proyek: sql<number>`count(${proper.id})`,
          total_instansi: sql<number>`count(DISTINCT ${instansi.instansi_id})`
        })
        .from(proper)
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .where(sql`${instansi.instansi_id} IS NOT NULL`)
        .groupBy(instansi.id_instansi_kategori)
        .orderBy(sql<number>`count(${proper.id}) DESC`)

      // Detail per instansi dalam setiap kategori
      const detailByInstansi = await db
        .select({
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
          `,
          total_proyek: sql<number>`count(${proper.id})`
        })
        .from(proper)
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .where(sql`${instansi.instansi_id} IS NOT NULL`)
        .groupBy(instansi.instansi_id, instansi.nama_instansi, instansi.id_instansi_kategori)
        .orderBy(instansi.id_instansi_kategori, sql<number>`count(${proper.id}) DESC`)

      // Struktur data nested: kategori -> detail instansi
      const result = summaryByCategory.map(kategori => ({
        kategori_id: kategori.id_instansi_kategori,
        kategori_name: kategori.kategori_name,
        total_proyek: kategori.total_proyek,
        total_instansi: kategori.total_instansi,
        detail_instansi: detailByInstansi
          .filter(detail => detail.id_instansi_kategori === kategori.id_instansi_kategori)
          .map(detail => ({
            instansi_id: detail.instansi_id,
            nama_instansi: detail.nama_instansi,
            total_proyek: detail.total_proyek
          }))
      }))

      return {
        success: true,
        summary: result
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
