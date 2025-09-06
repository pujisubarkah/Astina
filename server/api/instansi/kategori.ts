import { instansi } from '../../database/schema/instansi'
import { db } from '../../db'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const url = new URL(event.node.req.url!, `http://${event.node.req.headers.host}`)
    const flat = url.searchParams.get('flat') === 'true'
    
    // Ambil semua data instansi
    const allInstansi = await db.select().from(instansi)
    
    if (flat) {
      // Return data flat jika diminta
      return { success: true, data: allInstansi }
    } else {
      // Default: Kelompokkan per kategori
      const kategoris = [
        { id: 1, name: 'Kementerian' },
        { id: 2, name: 'Lembaga' },
        { id: 3, name: 'Pemerintah Provinsi' },
        { id: 4, name: 'Pemerintah Kabupaten' },
        { id: 5, name: 'Pemerintah Kota' }
      ]

      // Kelompokkan berdasarkan kategori
      const groupedData = kategoris.map(kategori => {
        const instansiInKategori = allInstansi.filter(item => 
          item.id_instansi_kategori === kategori.id
        )

        return {
          kategori_id: kategori.id,
          kategori_name: kategori.name,
          total_instansi: instansiInKategori.length,
          instansi: instansiInKategori.map(item => ({
            id: item.id,
            instansi_id: item.instansi_id,
            nama_instansi: item.nama_instansi,
            id_instansi_kategori: item.id_instansi_kategori,
            id_kabupaten: item.id_kabupaten,
            id_provinsi: item.id_provinsi
          }))
        }
      }).filter(kategori => kategori.total_instansi > 0) // Hanya kategori yang memiliki instansi

      return { 
        success: true, 
        total_kategori: groupedData.length,
        total_instansi: allInstansi.length,
        data: groupedData 
      }
    }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.namaInstansi) {
      throw createError({ statusCode: 400, statusMessage: 'Nama instansi wajib diisi' })
    }
    const newInstansi = await db.insert(instansi).values({
      instansi_id: body.instansiId,
      nama_instansi: body.namaInstansi,
      id_instansi_kategori: body.idInstansiKategori,
    }).returning()
    return { success: true, data: newInstansi[0] }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
})