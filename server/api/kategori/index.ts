import { kategoriInstansi } from '../../database/schema/kategori_instansi';
import { db } from '../../db';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const data = await db.select().from(kategoriInstansi);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: (error instanceof Error ? error.message : 'Gagal mengambil data kategori instansi'),
    };
  }
});