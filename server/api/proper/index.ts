// server/api/proper/index.ts

import { proper } from '../../database/schema/proper'
import { db } from '../../db'

// GET: Ambil semua data proper dengan join pelatihan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const data = await db.select().from(proper)
      return { success: true, data }
    }

    if (event.method === 'POST') {
      const body = await readBody(event)
      if (!body.nama) {
        throw createError({ statusCode: 400, statusMessage: 'Nama peserta wajib diisi' })
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

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})