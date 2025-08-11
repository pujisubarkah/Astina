import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const data = await db.select().from(instansi)
    return { success: true, data }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.namaInstansi) {
      throw createError({ statusCode: 400, statusMessage: 'Nama instansi wajib diisi' })
    }
    const newInstansi = await db.insert(instansi).values({
      instansiId: body.instansiId,
      namaInstansi: body.namaInstansi,
      idInstansiKategori: body.idInstansiKategori,
    }).returning()
    return { success: true, data: newInstansi[0] }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
})