// server/api/proper/index.ts

import { proper } from '../../database/schema/proper'
import { lemdik } from '../../database/schema/lemdik'
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { eq, and, or, like, sql } from 'drizzle-orm'

// GET: Ambil semua data proper dengan JOIN ke lemdik, pelatihan, dan instansi
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Ambil query parameters untuk filtering
      const query = getQuery(event)
      const {
        search,
        instansiId,
        programId,
        lemdikId,
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

      // Filter by lemdik
      if (lemdikId) {
        conditions.push(eq(proper.lemdikId, Number(lemdikId)))
      }

      // Combine conditions
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined

      // Get total count for pagination
      const countResult = await db
        .select({ count: sql`count(*)` })
        .from(proper)
        .where(whereClause)
      
      const total = Number(countResult[0]?.count || 0)

      // Calculate pagination
      const pageNum = Number(page)
      const limitNum = Number(limit)
      const offset = (pageNum - 1) * limitNum

      // Select data dengan JOIN dan pagination
      const data = await db
        .select({
          id: proper.id,
          nama: proper.nama,
          noIdentitas: proper.noIdentitas,
          instansiId: proper.instansiId,
          namaInstansi: instansi.nama_instansi,
          programId: proper.programId,
          namaProgram: pelatihan.nama,
          lemdikId: proper.lemdikId,
          namaLemdik: lemdik.namalemdik,
          nomorKra: proper.nomorKra,
          proyekPerubahan: proper.proyekPerubahan,
          createdAt: proper.createdAt,
        })
        .from(proper)
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
        .leftJoin(lemdik, eq(proper.lemdikId, lemdik.id))
        .where(whereClause)
        .limit(limitNum)
        .offset(offset)
      
      return { 
        success: true, 
        data,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
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