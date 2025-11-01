// server/api/dashboard/keywords-cache.ts
// Lightweight endpoint untuk keyword data saja dengan caching

import { abstract } from '../../database/schema/abstract'
import { proper } from '../../database/schema/proper'
import { instansi } from '../../database/schema/instansi'
import { kategoriInstansi } from '../../database/schema/kategori_instansi'
import { db } from '../../db'
import { eq, sql } from 'drizzle-orm'

// Simple in-memory cache untuk keywords
let keywordCache: {
  data: any,
  timestamp: number
} | null = null

const CACHE_TTL = 10 * 60 * 1000 // 10 minutes cache

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Check cache first
      const now = Date.now()
      if (keywordCache && (now - keywordCache.timestamp) < CACHE_TTL) {
        console.log('Keywords Cache API: Returning cached data')
        return {
          success: true,
          timestamp: new Date(keywordCache.timestamp).toISOString(),
          data: keywordCache.data,
          cached: true
        }
      }

      console.time('Keywords Cache API')
      
      // Get all categories first
      const allKategoris = await db.select().from(kategoriInstansi)
      
      console.timeLog('Keywords Cache API', 'Categories loaded')

      // Optimized keyword query with strategic limit
      const keywordData = await db
        .select({
          kata_kunci: abstract.kata_kunci,
          instansi_id: instansi.instansi_id,
          nama_instansi: instansi.nama_instansi,
          id_instansi_kategori: instansi.id_instansi_kategori,
          kategori_name: kategoriInstansi.nama
        })
        .from(abstract)
        .leftJoin(proper, eq(abstract.proper_id, proper.id))
        .leftJoin(instansi, eq(proper.instansiId, instansi.instansi_id))
        .leftJoin(kategoriInstansi, eq(instansi.id_instansi_kategori, kategoriInstansi.id))
        .where(sql`${abstract.kata_kunci} IS NOT NULL AND ${instansi.instansi_id} IS NOT NULL`)
        .limit(2000) // Higher limit for better data coverage

      console.timeLog('Keywords Cache API', 'Keywords data loaded')

      // Process keywords efficiently
      const instansiKeywords: Record<number, {
        instansi_id: number,
        nama_instansi: string,
        id_instansi_kategori: number | null,
        kategori_name: string,
        keywords: Record<string, number>
      }> = {}

      // Batch processing
      const batchSize = 200
      for (let i = 0; i < keywordData.length; i += batchSize) {
        const batch = keywordData.slice(i, i + batchSize)
        
        batch.forEach(row => {
          if (!row.kata_kunci || !row.instansi_id) return
          
          if (!instansiKeywords[row.instansi_id]) {
            instansiKeywords[row.instansi_id] = {
              instansi_id: row.instansi_id,
              nama_instansi: row.nama_instansi || 'Unknown',
              id_instansi_kategori: row.id_instansi_kategori,
              kategori_name: row.kategori_name || 'Lainnya',
              keywords: {}
            }
          }

          let keywords: string[] = []
          if (Array.isArray(row.kata_kunci)) {
            keywords = row.kata_kunci
          } else if (typeof row.kata_kunci === 'string') {
            // Fast string processing
            const cleanString = row.kata_kunci
              .replace(/^\[\'?|\]$|\'$/g, '')
              .replace(/\'\s*,\s*\'/g, ',')
              .replace(/\'/g, '')
            keywords = cleanString.split(/[,;]+/)
              .map(k => k.trim())
              .filter(k => k && k.length > 2) // Filter short keywords
              .slice(0, 15) // Limit per entry
          }

          keywords.forEach(keyword => {
            if (keyword && row.instansi_id) {
              const instansiData = instansiKeywords[row.instansi_id]
              instansiData.keywords[keyword] = (instansiData.keywords[keyword] || 0) + 1
            }
          })
        })
      }

      console.timeLog('Keywords Cache API', 'Keywords processed')

      // Build final data structure
      const instansiArray = Object.values(instansiKeywords)
        .filter(instansi => Object.keys(instansi.keywords).length > 0)
        .map(instansi => ({
          instansi_id: instansi.instansi_id,
          nama_instansi: instansi.nama_instansi,
          id_instansi_kategori: instansi.id_instansi_kategori,
          kategori_name: instansi.kategori_name,
          total_keywords: Object.keys(instansi.keywords).length,
          top_keywords: Object.entries(instansi.keywords)
            .map(([keyword, count]) => ({ keyword, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)
        }))

      const summaryKataKunci = allKategoris.map(kategori => {
        const instansiInKategori = instansiArray
          .filter(instansi => instansi.id_instansi_kategori === kategori.id)
          .sort((a, b) => b.total_keywords - a.total_keywords)

        return {
          kategori_id: kategori.id,
          kategori_name: kategori.nama,
          total_instansi: instansiInKategori.length,
          total_keywords: instansiInKategori.reduce((sum, inst) => sum + inst.total_keywords, 0),
          instansi: instansiInKategori
        }
      }).filter(kategori => kategori.total_instansi > 0)

      const responseData = {
        total_instansi: instansiArray.length,
        total_kategori: summaryKataKunci.length,
        categories: summaryKataKunci
      }

      // Cache the results
      keywordCache = {
        data: responseData,
        timestamp: now
      }

      console.timeEnd('Keywords Cache API')
      
      return {
        success: true,
        timestamp: new Date().toISOString(),
        data: responseData,
        cached: false
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method tidak diizinkan' })
  } catch (err: any) {
    console.error('Keywords cache error:', err)
    console.timeEnd('Keywords Cache API')
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Internal server error' })
  }
})