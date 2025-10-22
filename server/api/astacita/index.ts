import { astacita } from '~/server/database/schema/astacita'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const data = await db.select({
        id: astacita.id,
        astacita_ke: astacita.astacita_ke,
        astacita: astacita.astacita,
        image: astacita.image,
      }).from(astacita)

      // If DB has no rows, return a default static set so frontend always has options
      if (!data || data.length === 0) {
        const defaultData = [
          { id: 1, astacita_ke: 1, astacita: 'Memperkokoh ideologi Pancasila, demokrasi, dan hak asasi manusia (HAM).', image: '/astacita/1.png' },
          { id: 2, astacita_ke: 2, astacita: 'Memantapkan sistem pertahanan keamanan negara dan mendorong kemandirian bangsa melalui swasembada pangan, energi, air, ekonomi kreatif, ekonomi hijau, dan ekonomi biru.', image: '/astacita/2.png' },
          { id: 3, astacita_ke: 3, astacita: 'Meningkatkan lapangan kerja yang berkualitas, mendorong kewirausahaan, mengembangkan industri kreatif, dan melanjutkan pengembangan infrastruktur.', image: '/astacita/3.png' },
          { id: 4, astacita_ke: 4, astacita: 'Memperkuat pembangunan sumber daya manusia (SDM), sains, teknologi, pendidikan, kesehatan, prestasi olahraga, kesetaraan gender, serta penguatan peran perempuan, pemuda, dan penyandang disabilitas.', image: '/astacita/4.png' },
          { id: 5, astacita_ke: 5, astacita: 'Melanjutkan hilirisasi dan industrialisasi untuk meningkatkan nilai tambah di dalam negeri.', image: '/astacita/5.png' }
        ]
        return { success: true, data: defaultData }
      }

      return { success: true, data }
    }

    if (event.method === 'POST') {
      const body = await readBody(event)

      if (!body.astacita_ke || !body.astacita) {
        throw createError({ statusCode: 400, statusMessage: 'astacita_ke and astacita are required' })
      }

      const insertValues: any = {
        astacita_ke: Number(body.astacita_ke),
        astacita: String(body.astacita),
      }

      if (body.image) insertValues.image = String(body.image)

      const newRow = await db.insert(astacita).values(insertValues).returning()

      return { success: true, data: newRow[0] }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    // Log full error for server-side debugging (do not expose stack to clients)
    console.error('[api/astacita] Error handling request', {
      method: event.method,
      path: event.req?.url,
      error: err && (err.stack || err.message || err)
    })
    throw createError({ statusCode: 500, statusMessage: 'Database error (see server logs)' })
  }
})
