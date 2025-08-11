// server/api/proyek_perubahan/instansi/[instansi_id].ts

import { proper } from '../../../database/schema/proper'
import { pelatihan } from '../../../database/schema/pelatihan'
import { instansi } from '../../../database/schema/instansi'
import { abstract } from '../../../database/schema/abstract'
import { db } from '../../../db'
import { eq, and } from 'drizzle-orm'

// GET: Ambil semua data proper berdasarkan instansi_id
export default defineEventHandler(async (event) => {
  try {
    const instansiId = Number(event.context.params?.instansi_id)
    
    if (!instansiId) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'instansi_id diperlukan' 
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
        kataKunci: abstract.kataKunci,
      })
      .from(proper)
      .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
      .leftJoin(instansi, eq(proper.instansiId, instansi.instansiId))
      .leftJoin(abstract, eq(abstract.properId, proper.id))
      .where(eq(proper.instansiId, instansiId))

    return { 
      success: true, 
      data,
      meta: {
        instansiId,
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
