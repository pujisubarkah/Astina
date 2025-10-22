import { pgTable, integer, smallint, text } from 'drizzle-orm/pg-core'

// Table: sdgs
export const sdgs = pgTable('master_sdgs', {
  id: integer('id').primaryKey().notNull(),
  tujuan_ke: smallint('tujuan_ke').notNull(), // int2
  sdgs: text('sdgs').notNull(),
  image: text('image')
})

export type SDGS = typeof sdgs.$inferSelect
export type NewSDGS = typeof sdgs.$inferInsert
