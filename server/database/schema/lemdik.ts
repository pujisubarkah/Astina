import { pgTable, serial, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

export const lemdik = pgTable('master_lemdik', {
  id: serial('id').primaryKey(),
  idsipka: integer('idsipka'),
  namalemdik: varchar('namalemdik', { length: 255 }),
  provinsiId: integer('provinsi_id'),
  instansiId: integer('instansi_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})