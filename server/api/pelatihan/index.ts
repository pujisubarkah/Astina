import { pelatihan } from '../../database/schema/pelatihan'
import { db } from '../../db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    try {
      const data = await db.select().from(pelatihan).orderBy(pelatihan.id)
      
      return {
        success: true,
        data: data,
        message: 'Data pelatihan berhasil diambil'
      }
    } catch (error) {
      console.error('Error fetching pelatihan:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Gagal mengambil data pelatihan'
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validate required fields
      if (!body.nama) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama pelatihan wajib diisi'
        })
      }

      const newPelatihan = await db.insert(pelatihan).values({
        nama: body.nama
      }).returning()

      return {
        success: true,
        data: newPelatihan[0],
        message: 'Data pelatihan berhasil ditambahkan'
      }
    } catch (error: any) {
      console.error('Error creating pelatihan:', error)
      if (error.statusCode) {
        throw error
      }
      throw createError({
        statusCode: 500,
        statusMessage: error?.message || 'Gagal menambahkan data pelatihan'
      })
    }
  }

  // Method not allowed
  throw createError({
    statusCode: 405,
    statusMessage: 'Method tidak diizinkan'
  })
})
