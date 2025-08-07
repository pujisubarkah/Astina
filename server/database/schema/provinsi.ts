// db/schema/proper.ts
import { pgSchema, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'

const proper = pgSchema('proper')

export const provinsi = proper.table('provinsi', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  svgPath: text('svg_path'),
  idProvinsi: integer('id_provinsi'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

