import { lemdik } from '../../database/schema/lemdik'
import { db } from '../../db'

export default defineEventHandler(async (event) => {
  // Only allow GET
  if (event.method === 'GET') {
    const data = await db.select().from(lemdik)
    return { success: true, data }
  }
  throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
})