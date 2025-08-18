// server/api/proper/index.ts

import { proper } from '../../database/schema/proper'
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { count } from 'drizzle-orm'
import { desc } from 'drizzle-orm/sql/expressions/select'
import { eq, sql } from 'drizzle-orm'

// GET: Ambil semua data proper dengan join pelatihan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Summary hanya per instansi
      const perInstansi = await db
        .select({
          instansiId: proper.instansiId,
          namaInstansi: instansi.namaInstansi,
          count: count()
        })
        .from(proper)
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansiId))
        .groupBy(proper.instansiId, instansi.namaInstansi)
        .orderBy(desc(count()))

      return {
        success: true,
        summary: perInstansi
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})