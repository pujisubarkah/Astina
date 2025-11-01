import { proper } from '../database/schema/proper'
import { db } from '../db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Accept proper_id, proyek_perubahan, and optionally abstract data
  const { proper_id, proyek_perubahan, abstract, kata_kunci, nilai_ekonomi, tanggal_mulai, tanggal_akhir } = body
  if (!proper_id || !proyek_perubahan) {
    return {
      success: false,
      message: 'proper_id dan proyek_perubahan wajib diisi',
    }
  }
  try {
    // Insert into proper table
  const resultProper = await db.insert(proper).values({
    id: proper_id,
    proyekPerubahan: proyek_perubahan,
    nama: body.nama, // Make sure 'nama' is provided in the request body
  })
    // If abstract data is provided, insert into abstract table
    let resultAbstract = null
    if (abstract || kata_kunci || nilai_ekonomi || tanggal_mulai || tanggal_akhir) {
      const { abstract: abstractTable } = await import('../database/schema/abstract')
      resultAbstract = await db.insert(abstractTable).values({
        proper_id,
        abstract,
        kata_kunci,
        nilai_ekonomi,
        tanggal_mulai,
        tanggal_akhir,
      })
    }
    return {
      success: true,
      data: {
        proper: resultProper,
        abstract: resultAbstract,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: (error instanceof Error ? error.message : 'Gagal menyimpan data'),
    }
  }
})
