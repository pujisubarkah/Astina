import { db } from '~/server/db'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Test basic database connectivity
    const result = await db.execute(sql`SELECT 1 as test`)
    
    // Test if the proper schema exists
    const schemaCheck = await db.execute(sql`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'proper'
    `)
    
    // Test if the master_sdgs table exists
    const tableCheck = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'proper' 
      AND table_name = 'master_sdgs'
    `)
    
    return {
      success: true,
      database: {
        connected: true,
        schema_exists: schemaCheck.rows.length > 0,
        sdgs_table_exists: tableCheck.rows.length > 0,
        environment: {
          database_url_configured: !!process.env.DATABASE_URL,
          node_env: process.env.NODE_ENV
        }
      },
      timestamp: new Date().toISOString()
    }
  } catch (err: any) {
    console.error('[health/database] Database health check failed:', {
      message: err.message,
      code: err.code,
      detail: err.detail,
      stack: err.stack
    })
    
    return {
      success: false,
      database: {
        connected: false,
        error: {
          message: err.message,
          code: err.code,
          detail: err.detail
        },
        environment: {
          database_url_configured: !!process.env.DATABASE_URL,
          node_env: process.env.NODE_ENV
        }
      },
      timestamp: new Date().toISOString()
    }
  }
})