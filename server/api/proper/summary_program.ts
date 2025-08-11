// server/api/proper/index.ts

import { proper } from '../../database/schema/proper'
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { count } from 'drizzle-orm/sql/functions/aggregate'
import { desc } from 'drizzle-orm/sql/expressions/select'
import { eq, sql } from 'drizzle-orm'

// GET: Ambil semua data proper dengan join pelatihan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Summary hanya per program
      const perProgram = await db
        .select({
          programId: proper.programId,
          programNama: pelatihan.nama,
          count: count()
        })
        .from(proper)
        .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
        .groupBy(proper.programId, pelatihan.nama)
        .orderBy(desc(count()))

      return {
        success: true,
        summary: perProgram
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})