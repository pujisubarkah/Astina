import { proper } from '../../database/schema/proper'
import { db } from '../../db'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
  // Total jumlah produk pembelajaran (distinct judul)
      const perProyek = await db
        .select({ proyekPerubahan: proper.proyekPerubahan })
        .from(proper)
        .where(sql`${proper.proyekPerubahan} IS NOT NULL AND ${proper.proyekPerubahan} <> ''`)
        .groupBy(proper.proyekPerubahan)

  const totalProdukPembelajaran = perProyek.length

      return {
        success: true,
        totalProdukPembelajaran
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})