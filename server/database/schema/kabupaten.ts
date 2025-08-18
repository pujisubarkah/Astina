import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const kabupaten = pgTable('kabupatens', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }),
  svg_path: text('svg_path'),
  id_provinsi: integer('id_provinsi'),
  id_kabupaten: integer('id_kabupaten'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})
