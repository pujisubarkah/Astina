import { pelatihan } from '../../database/schema/pelatihan'
import { db } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const data = await db.select().from(pelatihan)
    return { success: true, data }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.nama) {
      throw createError({ statusCode: 400, statusMessage: 'Nama pelatihan wajib diisi' })
    }
    const newPelatihan = await db.insert(pelatihan).values({ nama: body.nama }).returning()
    return { success: true, data: newPelatihan[0] }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
})
