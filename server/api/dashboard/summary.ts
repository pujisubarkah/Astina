// server/api/dashboard/summary.ts
// Endpoint gabungan untuk summary program, kata kunci, dan instansi

import { proper } from '../../database/schema/proper'
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { abstract } from '../../database/schema/abstract'
import { kategoriInstansi } from '../../database/schema/kategori_instansi'
import { db } from '../../db'
import { count } from 'drizzle-orm/sql/functions/aggregate'
import { desc } from 'drizzle-orm/sql/expressions/select'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      console.time('Dashboard Summary API')
      
      // Jalankan query secara parallel untuk meningkatkan performa
      const [summaryProgram, summaryByCategory, detailByInstansi, allKategoris] = await Promise.all([
        // 1. Summary per Program (dari /api/proper/summary_program)
        db.select({
          programId: proper.programId,
          programNama: pelatihan.nama,
          count: count()
        })
        .from(proper)
        .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
        .groupBy(proper.programId, pelatihan.nama)
        .orderBy(desc(count())),

        // 2. Summary per Kategori Instansi  
        db.select({
          id_instansi_kategori: instansi.id_instansi_kategori,
          kategori_name: kategoriInstansi.nama,
          total_proyek: count(),
          total_instansi: sql<number>`count(DISTINCT ${instansi.instansi_id})`
        })
        .from(proper)
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .leftJoin(kategoriInstansi, eq(instansi.id_instansi_kategori, kategoriInstansi.id))
        .where(sql`${instansi.instansi_id} IS NOT NULL`)
        .groupBy(instansi.id_instansi_kategori, kategoriInstansi.nama)
        .orderBy(desc(count())),

        // 3. Detail per Instansi  
        db.select({
          instansi_id: instansi.instansi_id,
          nama_instansi: instansi.nama_instansi,
          id_instansi_kategori: instansi.id_instansi_kategori,
          kategori_name: kategoriInstansi.nama,
          total_proyek: count()
        })
        .from(proper)
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .leftJoin(kategoriInstansi, eq(instansi.id_instansi_kategori, kategoriInstansi.id))
        .where(sql`${instansi.instansi_id} IS NOT NULL`)
        .groupBy(instansi.instansi_id, instansi.nama_instansi, instansi.id_instansi_kategori, kategoriInstansi.nama)
        .orderBy(instansi.id_instansi_kategori, desc(count())),

        // 4. Ambil semua kategori
        db.select().from(kategoriInstansi)
      ])

      console.timeLog('Dashboard Summary API', 'Main queries completed')

      const summaryInstansi = summaryByCategory.map(kategori => ({
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

      // 3. Get keywords data from cached endpoint
      console.timeLog('Dashboard Summary API', 'Fetching keywords from cache')
      let keywordsResponse
      try {
        const keywordsRes = await $fetch('/api/dashboard/keywords-cache')
        keywordsResponse = (keywordsRes && 'total_instansi' in keywordsRes) ? keywordsRes : {
          total_instansi: 0,
          total_kategori: 0,
          categories: []
        }
      } catch (err) {
        console.error('Error fetching keywords cache:', err)
        keywordsResponse = {
          total_instansi: 0,
          total_kategori: 0,
          categories: []
        }
      }

      console.timeLog('Dashboard Summary API', 'Data processing completed')

      const responseData = {
        // Summary per Program Pelatihan
        summary_program: {
          total_program: summaryProgram.length,
          programs: summaryProgram
        },
        
        // Summary per Kategori Instansi  
        summary_instansi: {
          total_kategori: summaryInstansi.length,
          categories: summaryInstansi
        },
        
        // Summary Kata Kunci per Instansi
        summary_kata_kunci: keywordsResponse,

        // Agregat data keseluruhan
        overview: {
          total_program: summaryProgram.length,
          total_instansi_kategori: summaryInstansi.length,
          total_instansi_with_keywords: keywordsResponse?.total_instansi || 0,
          total_proyek: summaryInstansi.reduce((sum, cat) => sum + (cat.total_proyek || 0), 0),
          total_keywords: (keywordsResponse && 'categories' in keywordsResponse ? keywordsResponse.categories : []).reduce((sum: number, cat: any) => sum + (cat.total_keywords || 0), 0)
        }
      }

      console.timeEnd('Dashboard Summary API')
      
      return {
        success: true,
        timestamp: new Date().toISOString(),
        data: responseData
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    console.error('Dashboard summary error:', err)
    console.timeEnd('Dashboard Summary API')
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})