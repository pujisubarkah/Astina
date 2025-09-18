// server/api/proyek_perubahan/count.ts

import { proper } from '../../database/schema/proper'
import { db } from '../../db'
import { count } from 'drizzle-orm'

// GET: Ambil total count proyek perubahan
export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const result = await db
        .select({ count: count() })
        .from(proper)

      return { 
        success: true, 
        data: {
          total_proyek: result[0].count
        }
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
