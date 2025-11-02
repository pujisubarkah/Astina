import { sdgs } from '~/server/database/schema/sdgs'
import { db } from '~/server/db'
import { fallbackSdgsData } from '~/utils/fallback-data'

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      // Check if DATABASE_URL is configured
      if (!process.env.DATABASE_URL) {
        console.warn('[api/sdgs] DATABASE_URL not configured, using fallback data')
        return { 
          success: true, 
          data: fallbackSdgsData,
          source: 'fallback',
          message: 'Using fallback data due to missing database configuration'
        }
      }

      // Try to fetch from database with timeout
      let data
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Database query timeout')), 10000) // 10 second timeout
        })
        
        const queryPromise = db.select({
          id: sdgs.id,
          tujuan_ke: sdgs.tujuan_ke,
          sdgs: sdgs.sdgs,
          image: sdgs.image,
        }).from(sdgs)

        data = await Promise.race([queryPromise, timeoutPromise]) as any[]
        
        console.log(`[api/sdgs] Successfully fetched ${data.length} SDGs records from database`)
        return { success: true, data, source: 'database' }
        
      } catch (dbError: any) {
        console.error('[api/sdgs] Database connection error, falling back to static data:', {
          message: dbError.message,
          code: dbError.code,
          detail: dbError.detail
        })
        
        // Return fallback data instead of throwing error
        return { 
          success: true, 
          data: fallbackSdgsData,
          source: 'fallback',
          message: `Database unavailable: ${dbError.message}. Using fallback data.`,
          error: {
            code: dbError.code,
            message: dbError.message
          }
        }
      }
    }

    if (event.method === 'POST') {
      // Check if DATABASE_URL is configured
      if (!process.env.DATABASE_URL) {
        throw createError({ 
          statusCode: 503, 
          statusMessage: 'Database not configured - POST operations unavailable' 
        })
      }

      const body = await readBody(event)
      if (body.tujuan_ke === undefined || !body.sdgs) {
        throw createError({ statusCode: 400, statusMessage: 'tujuan_ke and sdgs are required' })
      }

      const insertValues: any = {
        tujuan_ke: Number(body.tujuan_ke),
        sdgs: String(body.sdgs),
      }
      if (body.image) insertValues.image = String(body.image)

      let newRow
      try {
        newRow = await db.insert(sdgs).values(insertValues).returning()
        console.log('[api/sdgs] Successfully inserted new SDGs record:', newRow[0])
        return { success: true, data: newRow[0] }
      } catch (dbError: any) {
        console.error('[api/sdgs] Database insert error:', {
          message: dbError.message,
          code: dbError.code,
          detail: dbError.detail
        })
        throw createError({ 
          statusCode: 500, 
          statusMessage: `Database insert error: ${dbError.message}` 
        })
      }
    }

    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  } catch (err: any) {
    // Enhanced error logging
    console.error('[api/sdgs] Detailed error information:', {
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
      statusMessage: err.statusMessage,
      code: err.code,
      detail: err.detail,
      constraint: err.constraint,
      table: err.table,
      schema: err.schema,
      databaseUrl: process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
    
    // If it's already a createError, re-throw it
    if (err.statusCode) {
      throw err
    }
    
    // For GET requests, try to return fallback data even on unexpected errors
    if (event.method === 'GET') {
      console.warn('[api/sdgs] Returning fallback data due to unexpected error')
      return { 
        success: true, 
        data: fallbackSdgsData,
        source: 'fallback',
        message: `Unexpected error occurred: ${err.message}. Using fallback data.`,
        error: {
          message: err.message,
          code: err.code
        }
      }
    }
    
    // Default error for non-GET requests
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Database error: ${err.message || 'Unknown error'}` 
    })
  }
})
