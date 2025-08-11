// server/api/proper/index.ts

import { proper } from '@/server/database/schema/proper'
import { db } from '@/server/db'

// GET: Ambil semua data proper
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Select kolom sesuai schema
      const data = await db.select({
        id: proper.id,
        nama: proper.nama,
        noIdentitas: proper.noIdentitas,
        instansiId: proper.instansiId,
        programId: proper.programId,
        lemdikId: proper.lemdikId,
        nomorKra: proper.nomorKra,
        proyekPerubahan: proper.proyekPerubahan,
        createdAt: proper.createdAt,

      }).from(proper)
      return { success: true, data }
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