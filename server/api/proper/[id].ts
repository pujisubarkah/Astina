// server/api/proper/[id].ts

import { proper } from '../../database/schema/proper'
import { lemdik } from '../../database/schema/lemdik'
import { pelatihan } from '../../database/schema/pelatihan'
import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'ID wajib diisi' })
    }

    if (event.method === 'GET') {
      // Get single proper data by ID dengan JOIN
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
        .where(eq(proper.id, Number(id)))
        .limit(1)

      if (data.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan' })
      }

      return { success: true, data: data[0] }
    }

    if (event.method === 'PUT') {
      const body = await readBody(event)
      
      const updatedProper = await db
        .update(proper)
        .set({
          nama: body.nama,
          noIdentitas: body.noIdentitas,
          instansiId: body.instansiId,
          programId: body.programId,
          lemdikId: body.lemdikId,
          nomorKra: body.nomorKra,
          proyekPerubahan: body.proyekPerubahan
        })
        .where(eq(proper.id, Number(id)))
        .returning()

      if (updatedProper.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan' })
      }

      return { success: true, data: updatedProper[0] }
    }

    if (event.method === 'DELETE') {
      const deletedProper = await db
        .delete(proper)
        .where(eq(proper.id, Number(id)))
        .returning()

      if (deletedProper.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan' })
      }

      return { success: true, message: 'Data berhasil dihapus' }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ 
      statusCode: err.statusCode || 500, 
      statusMessage: err?.statusMessage || err?.message || 'Internal server error' 
    })
  }
})
