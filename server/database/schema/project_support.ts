import { pgTable, bigint, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const projectSupport = pgTable('project_support_files', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
  projectId: bigint('project_id', { mode: 'number' }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
})

export type ProjectSupport = typeof projectSupport.$inferSelect
export type NewProjectSupport = typeof projectSupport.$inferInsert