import { bigint, varchar, text, integer, timestamp, pgSchema } from 'drizzle-orm/pg-core'

const appSchema = pgSchema('proper')

export const users = appSchema.table('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: text('password').notNull(),
  roleId: integer('role_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
