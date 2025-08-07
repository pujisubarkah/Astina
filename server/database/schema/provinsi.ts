import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const provinsi = pgTable('prov', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  svgPath: text('svg_path'),
  idProvinsi: integer('id_provinsi'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

