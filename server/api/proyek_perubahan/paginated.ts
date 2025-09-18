// server/api/proyek_perubahan/paginated.ts

import { proper } from '../../database/schema/proper'
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { abstract } from '../../database/schema/abstract'
import { db } from '../../db'
import { eq, and, like, or, count } from 'drizzle-orm'

// GET: Ambil data proyek dengan pagination dan filter
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const query = getQuery(event)
      const page = parseInt(query.page as string) || 1
      const limit = parseInt(query.limit as string) || 9
      const offset = (page - 1) * limit
      const search = query.search as string || ''
      const instansiId = query.instansi_id as string
      const pelatihanId = query.pelatihan_id as string
      const sortBy = query.sort_by as string || 'latest'

      // Build where conditions
      const whereConditions = []
      
      // Search condition - search in nama, proyekPerubahan, abstract, and kata_kunci
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

      // Get total count for pagination
      const totalResult = await db
        .select({ count: count() })
        .from(proper)
        .leftJoin(abstract, eq(abstract.proper_id, proper.id))
        .where(whereClause)

      const total = totalResult[0].count
      const totalPages = Math.ceil(total / limit)

      // Get data with pagination and sorting
      let orderColumn;
      switch (sortBy) {
        case 'title':
          orderColumn = proper.proyekPerubahan;
          break;
        case 'name':
          orderColumn = proper.nama;
          break;
        case 'latest':
        default:
          orderColumn = proper.createdAt;
          break;
      }

      const query_builder = db
        .select({
          id: proper.id,
          nama: proper.nama,
          noIdentitas: proper.noIdentitas,
          instansiId: proper.instansiId,
          programId: proper.programId,
          lemdikId: proper.lemdikId,
          nomorKra: proper.nomorKra,
          proyekPerubahan: proper.proyekPerubahan,
          createdAt: proper.createdAt,
          programNama: pelatihan.nama,
          namaInstansi: instansi.nama_instansi,
          abstract: abstract.abstract,
          kataKunci: abstract.kata_kunci,
        })
        .from(proper)
        .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .leftJoin(abstract, eq(abstract.proper_id, proper.id))
        .where(whereClause)
        .orderBy(orderColumn)
        .limit(limit)
        .offset(offset)

      const data = await query_builder

      return { 
        success: true, 
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
