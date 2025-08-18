// server/api/proyek_perubahan/pelatihan/[program_id].ts

import { proper } from '../../../database/schema/proper'
import { pelatihan } from '../../../database/schema/pelatihan'
import { instansi } from '../../../database/schema/instansi'
import { abstract } from '../../../database/schema/abstract'
import { db } from '../../../db'
import { eq, and } from 'drizzle-orm'

// GET: Ambil semua data proper berdasarkan program_id (id pelatihan)
export default defineEventHandler(async (event) => {
  try {
    const programId = Number(event.context.params?.program_id)
    
    if (!programId) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'program_id diperlukan' 
      })
    }

    const data = await db
      .select({
        id: proper.id,
        nama: proper.nama,
        noIdentitas: proper.noIdentitas,
        instansiId: proper.instansiId,
        programId: proper.programId,
        lemdikId: proper.lemdikId,
        nomorKra: proper.nomorKra,
        proyekPerubahan: proper.proyekPerubahan,
        createdAt: proper.createdAt,
        programNama: pelatihan.nama,
        namaInstansi: instansi.namaInstansi,
        abstract: abstract.abstract,
        kataKunci: abstract.kata_kunci,
      })
      .from(proper)
      .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
      .leftJoin(instansi, eq(proper.instansiId, instansi.instansiId))
      .leftJoin(abstract, eq(abstract.proper_id, proper.id))
      .where(eq(proper.programId, programId))

    return { 
      success: true, 
      data,
      meta: {
        programId,
        total: data.length
      }
    }

  } catch (err: any) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: err?.message || 'Internal server error' 
    })
  }
})
