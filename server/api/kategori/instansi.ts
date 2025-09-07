import { kategoriInstansi } from '../../database/schema/kategori_instansi';
import { instansi } from '../../database/schema/instansi';
import { db } from '../../db';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const kategoriList = await db.select().from(kategoriInstansi);
    const instansiList = await db.select().from(instansi);
    const data = kategoriList.map(kat => ({
      ...kat,
      instansi: instansiList.filter(i => i.id_instansi_kategori === kat.id)
    }));
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error instanceof Error ? error.message : 'Gagal mengambil data') };
  }
});