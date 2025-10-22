import { sdgs } from '~/server/database/schema/sdgs'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const data = await db.select({
        id: sdgs.id,
        tujuan_ke: sdgs.tujuan_ke,
        sdgs: sdgs.sdgs,
        image: sdgs.image,
      }).from(sdgs)

      return { success: true, data }
    }

    if (event.method === 'POST') {
      const body = await readBody(event)
      if (body.tujuan_ke === undefined || !body.sdgs) {
        throw createError({ statusCode: 400, statusMessage: 'tujuan_ke and sdgs are required' })
      }

      const insertValues: any = {
        tujuan_ke: Number(body.tujuan_ke),
        sdgs: String(body.sdgs),
      }
      if (body.image) insertValues.image = String(body.image)

      const newRow = await db.insert(sdgs).values(insertValues).returning()
      return { success: true, data: newRow[0] }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    console.error('[api/sdgs] Error', err && (err.stack || err.message || err))
    throw createError({ statusCode: 500, statusMessage: 'Database error (see server logs)' })
  }
})
