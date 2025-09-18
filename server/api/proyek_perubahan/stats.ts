// server/api/proyek_perubahan/stats.ts

import { proper } from '../../database/schema/proper'
import { abstract } from '../../database/schema/abstract'
import { db } from '../../db'
import { count, countDistinct, and, like, or, eq } from 'drizzle-orm'

// GET: Ambil statistik global proyek perubahan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const query = getQuery(event)
      const search = query.search as string || ''
      const instansiId = query.instansi_id as string
      const pelatihanId = query.pelatihan_id as string

      // Build where conditions yang sama dengan paginated API
      const whereConditions = []
      
      // Search condition
      if (search) {
        whereConditions.push(
          or(
            like(proper.nama, `%${search}%`),
            like(proper.proyekPerubahan, `%${search}%`),
            like(abstract.abstract, `%${search}%`),
            like(abstract.kata_kunci, `%${search}%`)
          )
        )
      }

      // Filter by instansi
      if (instansiId) {
        whereConditions.push(eq(proper.instansiId, parseInt(instansiId)))
      }

      // Filter by pelatihan
      if (pelatihanId) {
        whereConditions.push(eq(proper.programId, parseInt(pelatihanId)))
      }

      const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined

      // Get total projects (yang sudah difilter)
      const totalProjectsResult = await db
        .select({ count: count() })
        .from(proper)
        .leftJoin(abstract, eq(abstract.proper_id, proper.id))
        .where(whereClause)

      // Get unique contributors (yang sudah difilter)
      const contributorsResult = await db
        .select({ count: countDistinct(proper.nama) })
        .from(proper)
        .leftJoin(abstract, eq(abstract.proper_id, proper.id))
        .where(whereClause)

      // Get total projects tanpa filter untuk statistik global
      const globalTotalResult = await db
        .select({ count: count() })
        .from(proper)

      // Semua proyek dianggap selesai karena sudah di database
      const totalProjects = totalProjectsResult[0].count
      const totalContributors = contributorsResult[0].count
      const globalTotal = globalTotalResult[0].count

      return { 
        success: true, 
        data: {
          // Statistik yang difilter (untuk display "Ditampilkan")
          filtered_total: totalProjects,
          filtered_contributors: totalContributors,
          
          // Statistik global (untuk card utama)
          global_total: globalTotal,
          global_completed: globalTotal, // Semua proyek dianggap selesai
          global_contributors: globalTotal // Estimasi, bisa diupdate kalau perlu query terpisah
        }
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
