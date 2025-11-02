#!/usr/bin/env node

// Database connection test script
// Usage: node scripts/test-db-connection.mjs

import { Pool } from 'pg'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

console.log('🧪 Testing database connection...\n')

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set')
  console.log('Please set DATABASE_URL in your .env file or environment variables')
  process.exit(1)
}

// Parse and display connection info (without sensitive data)
try {
  const url = new URL(DATABASE_URL)
  console.log('📋 Database Configuration:')
  console.log(`   Host: ${url.hostname}`)
  console.log(`   Port: ${url.port || 5432}`)
  console.log(`   Database: ${url.pathname.slice(1)}`)
  console.log(`   SSL Mode: ${url.searchParams.get('sslmode') || 'not specified'}`)
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`)
} catch (err) {
  console.error('❌ Invalid DATABASE_URL format')
  console.log('Expected format: postgresql://username:password@host:port/database')
  process.exit(1)
}

// Test connection
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

async function testConnection() {
  let client
  try {
    console.log('🔌 Attempting to connect to database...')
    client = await pool.connect()
    console.log('✅ Database connection successful!')

    // Test basic query
    console.log('\n🔍 Testing basic query...')
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version')
    console.log('✅ Basic query successful!')
    console.log(`   Current time: ${result.rows[0].current_time}`)
    console.log(`   PostgreSQL version: ${result.rows[0].pg_version.split(' ')[0]}`)

    // Test schema existence
    console.log('\n🏗️  Checking schema and tables...')
    const schemaResult = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'proper'
    `)
    
    if (schemaResult.rows.length > 0) {
      console.log('✅ Schema "proper" exists')
      
      // Check for master_sdgs table
      const tableResult = await client.query(`
        SELECT table_name, table_type
        FROM information_schema.tables 
        WHERE table_schema = 'proper' 
        AND table_name = 'master_sdgs'
      `)
      
      if (tableResult.rows.length > 0) {
        console.log('✅ Table "proper.master_sdgs" exists')
        
        // Test record count
        const countResult = await client.query('SELECT COUNT(*) as count FROM proper.master_sdgs')
        console.log(`   Records in master_sdgs: ${countResult.rows[0].count}`)
      } else {
        console.log('❌ Table "proper.master_sdgs" does not exist')
        console.log('   This might cause API errors. Run database migrations.')
      }
    } else {
      console.log('❌ Schema "proper" does not exist')
      console.log('   This will cause API errors. Run database migrations.')
    }

    console.log('\n✅ Database connection test completed successfully!')
    
  } catch (err) {
    console.error('\n❌ Database connection test failed:')
    console.error(`   Error Code: ${err.code}`)
    console.error(`   Error Message: ${err.message}`)
    
    // Provide helpful suggestions based on error type
    if (err.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions:')
      console.log('   - Check if PostgreSQL server is running')
      console.log('   - Verify the host and port are correct')
      console.log('   - Check firewall settings')
    } else if (err.code === 'ENOTFOUND') {
      console.log('\n💡 Suggestions:')
      console.log('   - Check if the hostname is correct')
      console.log('   - Verify DNS resolution')
      console.log('   - Check network connectivity')
    } else if (err.code === '28000') {
      console.log('\n💡 Suggestions:')
      console.log('   - Check username and password')
      console.log('   - Verify user permissions')
      console.log('   - Check if user exists in database')
    } else if (err.code === '3D000') {
      console.log('\n💡 Suggestions:')
      console.log('   - Check if database name is correct')
      console.log('   - Verify database exists on server')
      console.log('   - Check user access to database')
    }
    
    process.exit(1)
  } finally {
    if (client) {
      client.release()
    }
    await pool.end()
  }
}

testConnection()