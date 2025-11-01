// server/api/alumni/program.ts

import { proper } from '../../database/schema/proper'
import { pelatihan } from '../../database/schema/pelatihan'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  }

  try {
    const rows = await db
      .select({
        namaProgram: pelatihan.nama,
      })
      .from(proper)
      .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))

    const summary: Record<string, number> = {}

    for (const row of rows) {
      const key = row.namaProgram || 'Unknown'
      summary[key] = (summary[key] || 0) + 1
    }

    return { success: true, data: summary }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil data per program' })
  }
})