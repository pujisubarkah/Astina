// server/api/proper/index.ts

import { proper } from '../../database/schema/proper'
// import { lemdik } from '../../database/schema/lemdik' // Removed lemdik import
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { eq, and, or, like, sql } from 'drizzle-orm'

// GET: Ambil semua data proper dengan JOIN ke pelatihan, dan instansi
// Support filtering by: search, instansiId, programId, namaPelatihan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Ambil query parameters untuk filtering
      const query = getQuery(event)
      const {
        search,
        instansiId,
        programId,
        namaPelatihan, // Filter by training name
        page = '1',
        limit = '10'
      } = query

      // Build WHERE conditions
      const conditions = []

      // Filter by search (nama, NIP, proyek perubahan)
      if (search && typeof search === 'string') {
        conditions.push(
          or(
            like(proper.nama, `%${search}%`),
            like(proper.noIdentitas, `%${search}%`),
            like(proper.proyekPerubahan, `%${search}%`)
          )
        )
      }

      // Filter by instansi
      if (instansiId) {
        conditions.push(eq(proper.instansiId, Number(instansiId)))
      }

      // Filter by program
      if (programId) {
        conditions.push(eq(proper.programId, Number(programId)))
      }

      // Filter by training name
      if (namaPelatihan && typeof namaPelatihan === 'string') {
        conditions.push(like(pelatihan.nama, `%${namaPelatihan}%`))
      }

      // Combine conditions
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined

      // Check if all data is requested
      const isAllData = query.all === 'true' || query.all === '1'

      let data, total, pagination

      if (isAllData) {
        // Get all data without pagination
        data = await db
          .select({
            nama: proper.nama,
            pelatihan: pelatihan.nama,
            proyekPerubahan: proper.proyekPerubahan,
          })
          .from(proper)
          .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
          .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
          .where(whereClause)

        total = data.length
        pagination = {
          page: 1,
          limit: total,
          total,
          totalPages: 1
        }
      } else {
        // Get total count for pagination
        const countResult = await db
          .select({ count: sql`count(*)` })
          .from(proper)
          .where(whereClause)
        
        total = Number(countResult[0]?.count || 0)

        // Calculate pagination
        const pageNum = Number(page)
        const limitNum = Number(limit)
        const offset = (pageNum - 1) * limitNum

        // Select data dengan JOIN dan pagination - hanya field yang diminta
        data = await db
          .select({
            nama: proper.nama,
            pelatihan: pelatihan.nama,
            proyekPerubahan: proper.proyekPerubahan,
          })
          .from(proper)
          .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
          .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
          .where(whereClause)
          .limit(limitNum)
          .offset(offset)

        pagination = {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
      
      return { 
        success: true, 
        data,
        pagination
      }
    }

    if (event.method === 'POST') {
      const body = await readBody(event)
      
      // Validasi data yang diperlukan
      if (!body.nama) {
        throw createError({ statusCode: 400, statusMessage: 'Nama is required' })
      }

      const newProper = await db.insert(proper).values({
        nama: body.nama,
        noIdentitas: body.noIdentitas,
        instansiId: body.instansiId,
        programId: body.programId,
        lemdikId: body.lemdikId,
        nomorKra: body.nomorKra,
        proyekPerubahan: body.proyekPerubahan
      }).returning()

      return { success: true, data: newProper[0] }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})