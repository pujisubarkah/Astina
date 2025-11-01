// server/api/alumni/usia.ts

import { proper } from '../../database/schema/proper'
import { db } from '../../db'

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  }

  try {
    const rows = await db.select({ noIdentitas: proper.noIdentitas }).from(proper)

    const currentYear = new Date().getFullYear()

    type AgeGroup = '<20' | '20-29' | '30-39' | '40-49' | '50-59' | '60+' | 'TidakDiketahui';

    const getAgeGroup = (age: number): AgeGroup => {
      if (age < 20) return '<20';
      if (age <= 29) return '20-29';
      if (age <= 39) return '30-39';
      if (age <= 49) return '40-49';
      if (age <= 59) return '50-59';
      return '60+';
    };

    const summary: Record<AgeGroup, number> = {
      '<20': 0,
      '20-29': 0,
      '30-39': 0,
      '40-49': 0,
      '50-59': 0,
      '60+': 0,
      TidakDiketahui: 0,
    };

    for (const row of rows) {
      const nik = row.noIdentitas?.toString().trim() || ''
      if (nik.length >= 16) {
        const tahunLahir = parseInt(nik.substring(0, 4), 10)
        if (!isNaN(tahunLahir) && tahunLahir > 1900 && tahunLahir <= currentYear) {
          const umur = currentYear - tahunLahir
          const group = getAgeGroup(umur)
          summary[group]++
        } else {
          summary.TidakDiketahui++
        }
      } else {
        summary.TidakDiketahui++
      }
    }

    return { success: true, data: summary }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil data per rentang usia' })
  }
})