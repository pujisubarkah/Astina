import { pgSchema, integer, varchar } from 'drizzle-orm/pg-core'

const appSchema = pgSchema('proper')

export const astacita = appSchema.table('master_astacita', {
	// Using integer for int4
	id: integer('id').primaryKey().notNull(),
	astacita_ke: integer('astacita_ke').notNull(),
	astacita: varchar('astacita', { length: 1024 }).notNull(),
	image: varchar('image', { length: 1024 }),
})

export type AstaCita = typeof astacita.$inferSelect
export type NewAstaCita = typeof astacita.$inferInsert
