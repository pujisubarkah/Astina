import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

// Table: astacita
export const astacita = pgTable('master_astacita', {
	// Using integer for int4
	id: integer('id').primaryKey().notNull(),
	astacita_ke: integer('astacita_ke').notNull(),
	astacita: varchar('astacita', { length: 1024 }).notNull(),
	image: varchar('image', { length: 1024 }),
})

export type AstaCita = typeof astacita.$inferSelect
export type NewAstaCita = typeof astacita.$inferInsert
