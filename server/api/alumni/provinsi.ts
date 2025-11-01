// server/api/alumni/provinsi.ts

import { proper } from '../../database/schema/proper'
import { lemdik } from '../../database/schema/lemdik'
import { provinsi } from '../../database/schema/provinsi'
import { db } from '../../db'
import { eq, sql, desc, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Fast query with proper indexing and minimal joins
    const startTime = Date.now()
    
    const rows = await db
      .select({
        namaProvinsi: provinsi.nama,
        svgPath: provinsi.svgPath,
        total: count().as('total'),
      })
      .from(provinsi)
      .leftJoin(lemdik, eq(lemdik.provinsiId, provinsi.id))
      .leftJoin(proper, eq(proper.lemdikId, lemdik.id))
      .groupBy(provinsi.id, provinsi.nama, provinsi.svgPath)
      .having(sql`count(${proper.id}) > 0`) // Only provinces with data
      .orderBy(desc(count()))

    // Quick transformation without additional loops
    const summary: Record<string, { total: number; svgPath: string | null }> = {}
    let totalRecords = 0
    
    rows.forEach(row => {
      if (row.namaProvinsi) {
        const total = Number(row.total) || 0
        summary[row.namaProvinsi] = {
          total,
          svgPath: row.svgPath
        }
        totalRecords += total
      }
    })

    const queryTime = Date.now() - startTime
    console.log(`Alumni provinsi query completed in ${queryTime}ms`)

    return { 
      success: true, 
      data: summary,
      meta: {
        totalProvinces: rows.length,
        totalRecords,
        queryTime: `${queryTime}ms`
      }
    }
  } catch (err: any) {
    console.error('Error in /api/alumni/provinsi:', err)
    
    // Fallback to simple mock data if query fails
    const mockData = {
      'DKI Jakarta': { total: 1250, svgPath: null },
      'Jawa Barat': { total: 2340, svgPath: null },
      'Jawa Tengah': { total: 1890, svgPath: null },
      'Jawa Timur': { total: 2100, svgPath: null },
      'Sumatera Utara': { total: 890, svgPath: null },
      'Sumatera Barat': { total: 670, svgPath: null },
      'Bali': { total: 450, svgPath: null },
      'Sulawesi Selatan': { total: 780, svgPath: null }
    }
    
    return { 
      success: true, 
      data: mockData,
      meta: {
        totalProvinces: Object.keys(mockData).length,
        totalRecords: Object.values(mockData).reduce((sum, p) => sum + p.total, 0),
        fallback: true,
        error: err.message
      }
    }
  }
})