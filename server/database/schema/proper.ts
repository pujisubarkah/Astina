// server/database/schema/peserta.ts
import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const proper = pgTable('proper', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  noIdentitas: varchar('no_identitas', { length: 100 }),
  instansiId: integer('instansi_id'),
  programId: integer('program_id'),
  lemdikId: integer('lemdik_id'),
  nomorKra: varchar('nomor_kra', { length: 100 }),
  proyekPerubahan: text('proyek_perubahan'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})