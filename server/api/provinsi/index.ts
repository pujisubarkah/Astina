// server/api/provinsi/index.ts

import { provinsi } from '@/server/database/schema/provinsi'
import { db } from '@/server/db'


// GET: Ambil semua data provinsi
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Select semua kolom tanpa explicit mapping karena Drizzle akan handle otomatis
      const data = await db.select().from(provinsi)
      return { success: true, data }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
