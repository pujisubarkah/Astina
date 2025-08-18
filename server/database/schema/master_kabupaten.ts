import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core'

export const master_kabupaten = pgTable('master_kabupaten', {
  id: serial('id').primaryKey(),
  id_kabupaten: integer('id_kabupaten'),
  nama: varchar('nama', { length: 255 })
})
