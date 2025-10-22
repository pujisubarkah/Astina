import { eq, and } from 'drizzle-orm'
import { proper } from '~/server/database/schema/proper'
import { instansi } from '~/server/database/schema/instansi'
import { lemdik } from '~/server/database/schema/lemdik'
import { pelatihan } from '~/server/database/schema/pelatihan'
import { kategoriInstansi } from '~/server/database/schema/kategori_instansi'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { nip, pelatihanId } = query

    // Validasi input
    if (!nip || !pelatihanId) {
      return {
        success: false,
        message: 'NIP dan Program Pelatihan harus diisi',
        data: null
      }
    }

    // Cari data di tabel proper berdasarkan NIP (noIdentitas) dan programId
    const properData = await db
      .select({
        proper: proper,
        instansi: instansi,
        lemdik: lemdik,
        pelatihan: pelatihan,
        kategori_instansi: kategoriInstansi
      })
      .from(proper)
      .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
      .leftJoin(lemdik, eq(proper.lemdikId, lemdik.idsipka))
      .leftJoin(pelatihan, eq(proper.programId, pelatihan.id))
      .leftJoin(kategoriInstansi, eq(instansi.id_instansi_kategori, kategoriInstansi.id))
      .where(
        and(
          eq(proper.noIdentitas, String(nip)),
          eq(proper.programId, Number(pelatihanId))
        )
      )
      .limit(1)

    if (!properData || properData.length === 0) {
      return {
        success: false,
        message: 'Data tidak ditemukan untuk NIP dan Program Pelatihan tersebut',
        data: null
      }
    }

    const data = properData[0]
    
    console.log('Auto-fill debug data:', {
      proper: data.proper,
      instansi: data.instansi,
      kategori_instansi: data.kategori_instansi,
      lemdik: data.lemdik,
      pelatihan: data.pelatihan
    })

    // Format data untuk auto-fill
    const autoFillData = {
      proper_id: data.proper.id,
      authorName: data.proper.nama || '',
      nip: data.proper.noIdentitas || '',
      email: '', // Email tidak ada di tabel proper
      kategoriInstansi: data.kategori_instansi?.id || '', // ID kategori untuk mapping ke frontend
      institution: data.instansi?.instansi_id || '', // Gunakan instansi_id bukan id
      lembagaDiklat: data.lemdik?.id || '', // Gunakan id dari master_lemdik untuk frontend
      training: data.pelatihan?.id || '',
      title: data.proper.proyekPerubahan || '', // Menggunakan proyekPerubahan sebagai judul
      nomorKra: data.proper.nomorKra || '',
      // Data tambahan untuk combobox
      kategoriInstansiName: data.kategori_instansi?.nama || '',
      institutionName: data.instansi?.nama_instansi || '',
      lembagaDiklatName: data.lemdik?.namalemdik || '',
      trainingName: data.pelatihan?.nama || ''
    }

    return {
      success: true,
      message: 'Data ditemukan dan berhasil dimuat',
      data: autoFillData
    }

  } catch (error) {
    console.error('Error in autofill API:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengambil data',
      data: null,
      error: error.message
    }
  }
})