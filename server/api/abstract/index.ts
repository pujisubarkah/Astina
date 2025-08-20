import { abstract } from '../../database/schema/abstract'
import { proper } from '../../database/schema/proper'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const query = getQuery(event)
      const page = parseInt(query.page as string) || 1
      const limit = parseInt(query.limit as string) || 50
      const offset = (page - 1) * limit
      const properId = query.proper_id as string

      // Jika ada parameter proper_id, filter berdasarkan proper_id
      if (properId) {
        const data = await db
          .select({
            id: abstract.id,
            proper_id: abstract.proper_id,
            abstract: abstract.abstract,
            kata_kunci: abstract.kata_kunci,
            nilai_ekonomi: abstract.nilai_ekonomi,
            tanggal_mulai: abstract.tanggal_mulai,
            tanggal_akhir: abstract.tanggal_akhir,
          })
          .from(abstract)
          .where(eq(abstract.proper_id, parseInt(properId)))
          .limit(limit)
          .offset(offset)

        return { 
          success: true, 
          data: data.length > 0 ? data[0] : null, // Return single object untuk specific proper_id
          page, 
          limit 
        }
      }

      // Jika tidak ada parameter, ambil semua data dengan join ke proper untuk info tambahan
      const data = await db
        .select({
          id: abstract.id,
          proper_id: abstract.proper_id,
          abstract: abstract.abstract,
          kata_kunci: abstract.kata_kunci,
          nilai_ekonomi: abstract.nilai_ekonomi,
          tanggal_mulai: abstract.tanggal_mulai,
          tanggal_akhir: abstract.tanggal_akhir,
          // Tambahan info dari tabel proper
          nama_peserta: proper.nama,
          proyek_perubahan: proper.proyekPerubahan,
        })
        .from(abstract)
        .leftJoin(proper, eq(abstract.proper_id, proper.id))
        .limit(limit)
        .offset(offset)

      // Hitung total data untuk pagination
      const totalResult = await db
        .select({ count: abstract.id })
        .from(abstract)
      const total = totalResult.length

      return { 
        success: true, 
        data, 
        page, 
        limit, 
        total,
        totalPages: Math.ceil(total / limit)
      }
    }

    if (event.method === 'POST') {
      const body = await readBody(event)
      
      // Validasi data yang required
      if (!body.proper_id) {
        throw createError({ statusCode: 400, statusMessage: 'proper_id wajib diisi' })
      }

      const newAbstract = await db.insert(abstract).values({
        proper_id: body.proper_id,
        abstract: body.abstract || null,
        kata_kunci: body.kata_kunci || null,
        nilai_ekonomi: body.nilai_ekonomi || null,
        tanggal_mulai: body.tanggal_mulai || null,
        tanggal_akhir: body.tanggal_akhir || null,
      }).returning()

      return { success: true, data: newAbstract[0] }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})
