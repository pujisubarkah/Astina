import { pgSchema, serial, integer, varchar } from 'drizzle-orm/pg-core'

const appSchema = pgSchema('proper')

export const kabupaten = appSchema.table('master_kabupaten', {
  id: serial('id').primaryKey(),
  id_kabupaten: integer('id_kabupaten'),
  nama: varchar('nama', { length: 255 })
})
