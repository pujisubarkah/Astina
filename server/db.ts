import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Enhanced database configuration for production
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set')
  throw new Error('DATABASE_URL environment variable is required')
}

// Parse DATABASE_URL to log connection info (without sensitive data)
try {
  const url = new URL(DATABASE_URL)
  console.log('🗄️ Database connection info:', {
    host: url.hostname,
    port: url.port || 5432,
    database: url.pathname.slice(1),
    ssl: url.searchParams.get('sslmode') === 'require' ? 'enabled' : 'disabled',
    environment: process.env.NODE_ENV
  })
} catch (err) {
  console.error('❌ Invalid DATABASE_URL format:', err)
}

// Create connection pool with enhanced configuration
const pool = new Pool({
  connectionString: DATABASE_URL,
  // Production optimizations
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // Connection timeout
  // Enable SSL for production
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Database pool error:', err)
})

pool.on('connect', (client) => {
  console.log('✅ New database connection established')
})

pool.on('remove', (client) => {
  console.log('🔄 Database connection removed from pool')
})

export const db = drizzle(pool)

// Test connection on startup
pool.connect()
  .then((client) => {
    console.log('✅ Database connection test successful')
    client.release()
  })
  .catch((err) => {
    console.error('❌ Database connection test failed:', {
      message: err.message,
      code: err.code,
      detail: err.detail
    })
  })