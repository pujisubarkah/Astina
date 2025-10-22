import { astacita } from '~/server/database/schema/astacita'
import { db } from '~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Invalid id' })

  try {
    if (event.method === 'GET') {
      const rows = await db.select({
        id: astacita.id,
        astacita_ke: astacita.astacita_ke,
        astacita: astacita.astacita,
        image: astacita.image,
      }).from(astacita).where(eq(astacita.id, id))
      return { success: true, data: rows[0] || null }
    }

    if (event.method === 'PUT' || event.method === 'PATCH') {
      const body = await readBody(event)
      const updateValues: any = {
        updated_at: new Date()
      }
      if (body.astacita_ke !== undefined) updateValues.astacita_ke = Number(body.astacita_ke)
      if (body.astacita !== undefined) updateValues.astacita = String(body.astacita)
      if (body.image !== undefined) updateValues.image = String(body.image)

      const result = await db.update(astacita).set(updateValues).where(eq(astacita.id, id)).returning()
      return { success: true, data: result[0] }
    }

    if (event.method === 'DELETE') {
      const del = await db.delete(astacita).where(eq(astacita.id, id)).returning()
      return { success: true, data: del[0] }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    console.error('[api/astacita/:id] Error handling request', {
      method: event.method,
      path: event.req?.url,
      id,
      error: err && (err.stack || err.message || err)
    })
    throw createError({ statusCode: 500, statusMessage: 'Database error (see server logs)' })
  }
})
