import { pgTable, bigint, varchar, text, timestamp, boolean, json } from 'drizzle-orm/pg-core'

export const project = pgTable('projects', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
  userId: bigint('user_id', { mode: 'number' }).notNull(),
  instansiId: bigint('instansi_id', { mode: 'number' }).notNull(),
  kategoriInstansiId: bigint('kategori_instansi_id', { mode: 'number' }).notNull(), // Kategori instansi
  lemdikId: bigint('lemdik_id', { mode: 'number' }).notNull(),
  pelatihanId: bigint('pelatihan_id', { mode: 'number' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  nilaiEkonomi: text('nilai_ekonomi'), // Range nilai ekonomi
  detailNilaiEkonomi: bigint('detail_nilai_ekonomi', { mode: 'number' }), // Detail nilai rupiah
  publikasiMediaSosial: json('publikasi_media_sosial'), // JSON array untuk media sosial
  publikasiMediaMassa: json('publikasi_media_massa'), // JSON array untuk media massa
  tags: json('tags'), // JSON array untuk tags/kata kunci
  startDate: timestamp('start_date'), // Tanggal mulai proyek
  endDate: timestamp('end_date'), // Target selesai proyek
  mainFileUrl: text('main_file_url'),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isApproved: boolean('is_approved').default(false).notNull(),
})

export type Project = typeof project.$inferSelect
export type NewProject = typeof project.$inferInsert