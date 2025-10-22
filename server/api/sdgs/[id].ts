import { sdgs } from '~/server/database/schema/sdgs'
import { db } from '~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Invalid id' })

  try {
    if (event.method === 'GET') {
      const rows = await db.select({
        id: sdgs.id,
        tujuan_ke: sdgs.tujuan_ke,
        sdgs: sdgs.sdgs,
        image: sdgs.image,
      }).from(sdgs).where(eq(sdgs.id, id))
      return { success: true, data: rows[0] || null }
    }

    if (event.method === 'PUT' || event.method === 'PATCH') {
      const body = await readBody(event)
      const updateValues: any = {}
      if (body.tujuan_ke !== undefined) updateValues.tujuan_ke = Number(body.tujuan_ke)
      if (body.sdgs !== undefined) updateValues.sdgs = String(body.sdgs)
      if (body.image !== undefined) updateValues.image = String(body.image)

      const result = await db.update(sdgs).set(updateValues).where(eq(sdgs.id, id)).returning()
      return { success: true, data: result[0] }
    }

    if (event.method === 'DELETE') {
      const del = await db.delete(sdgs).where(eq(sdgs.id, id)).returning()
      return { success: true, data: del[0] }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    console.error('[api/sdgs/:id] Error', err && (err.stack || err.message || err))
    throw createError({ statusCode: 500, statusMessage: 'Database error (see server logs)' })
  }
})
