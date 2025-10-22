import pkg from 'pg'
const { Pool } = pkg

async function run() {
  const conn = process.env.DATABASE_URL
  if (!conn) {
    console.error('DATABASE_URL is not set in environment')
    process.exit(1)
  }

  const pool = new Pool({ connectionString: conn })
  try {
    console.log('Checking for master_astacita...')
    const r1 = await pool.query("SELECT to_regclass('public.master_astacita') AS exists;")
    console.log('to_regclass:', r1.rows)

    const r2 = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename ILIKE '%astacita%';")
    console.log('matching tables:', r2.rows)

    try {
      const r3 = await pool.query('SELECT id, astacita_ke, astacita, image FROM public.master_astacita LIMIT 5;')
      console.log('sample rows:', r3.rows)
    } catch (err) {
      console.error('Error selecting from master_astacita:', err.message || err)
    }
  } catch (err) {
    console.error('Probe error:', err)
  } finally {
    await pool.end()
  }
}

run()
