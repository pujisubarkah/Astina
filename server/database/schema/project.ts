import { pgTable, bigint, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const project = pgTable('projects', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
  userId: bigint('user_id', { mode: 'number' }).notNull(),
  instansiId: bigint('instansi_id', { mode: 'number' }).notNull(),
  lemdikId: bigint('lemdik_id', { mode: 'number' }).notNull(),
  pelatihanId: bigint('pelatihan_id', { mode: 'number' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  nilaiEkonomi: text('nilai_ekonomi'), // Changed from numeric to text
  mainFileUrl: text('main_file_url'),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isApproved: boolean('is_approved').default(false).notNull(),
})

export type Project = typeof project.$inferSelect
export type NewProject = typeof project.$inferInsert