import { abstract } from '@/server/database/schema/abstract' // Ensure this file exists at the specified path

// If the file does not exist, create '../../../database/schema/abstract.ts' with the following content:
// export const abstract = { /* schema definition here */ };
import { proper } from '@/server/database/schema/proper'
import { db } from '@/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (event.method === 'GET') {
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'ID wajib diisi' })
      }

      const data = await db
        .select({
          id: abstract.id,
          proper_id: abstract.proper_id,
          abstract: abstract.abstract,
          kata_kunci: abstract.kata_kunci,
          nilai_ekonomi: abstract.nilai_ekonomi,
          tanggal_mulai: abstract.tanggal_mulai,
          tanggal_akhir: abstract.tanggal_akhir,
          // Tambahan info dari tabel proper
          nama_peserta: proper.nama,
          proyek_perubahan: proper.proyekPerubahan,
          nip: proper.noIdentitas,
          nomor_kra: proper.nomorKra,
        })
        .from(abstract)
        .leftJoin(proper, eq(abstract.proper_id, proper.id))
        .where(eq(abstract.id, parseInt(id)))

      if (data.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Data abstract tidak ditemukan' })
      }

      return { success: true, data: data[0] }
    }

    if (event.method === 'PUT') {
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'ID wajib diisi' })
      }

      const body = await readBody(event)
      
      const updatedAbstract = await db
        .update(abstract)
        .set({
          abstract: body.abstract,
          kata_kunci: body.kata_kunci,
          nilai_ekonomi: body.nilai_ekonomi,
          tanggal_mulai: body.tanggal_mulai,
          tanggal_akhir: body.tanggal_akhir,
        })
        .where(eq(abstract.id, parseInt(id)))
        .returning()

      if (updatedAbstract.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Data abstract tidak ditemukan' })
      }

      return { success: true, data: updatedAbstract[0] }
    }

    if (event.method === 'DELETE') {
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'ID wajib diisi' })
      }

      const deletedAbstract = await db
        .delete(abstract)
        .where(eq(abstract.id, parseInt(id)))
        .returning()

      if (deletedAbstract.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Data abstract tidak ditemukan' })
      }

      return { success: true, message: 'Data abstract berhasil dihapus' }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
