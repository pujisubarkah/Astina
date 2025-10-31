import { pgSchema, serial, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

const appSchema = pgSchema('proper')

export const lemdik = appSchema.table('master_lemdik', {
  id: serial('id').primaryKey(),
  idsipka: integer('idsipka'),
  namalemdik: varchar('namalemdik', { length: 255 }),
  provinsiId: integer('provinsi_id'),
  instansiId: integer('instansi_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})