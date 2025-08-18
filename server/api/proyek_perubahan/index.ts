// server/api/proper/index.ts

import { proper } from '../../database/schema/proper'
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { abstract } from '../../database/schema/abstract'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

// GET: Ambil semua data proper dengan join pelatihan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const query = getQuery(event)
      const page = parseInt(query.page as string) || 1
      const limit = parseInt(query.limit as string) || 1000
      const offset = (page - 1) * limit

      const data = await db
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
          namaInstansi: instansi.namaInstansi,
          abstract: abstract.abstract,
          kataKunci: abstract.kata_kunci,
        })
        .from(proper)
        .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansiId))
        .leftJoin(abstract, eq(abstract.proper_id, proper.id))
        .limit(limit)
        .offset(offset)

      return { success: true, data, page, limit }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})