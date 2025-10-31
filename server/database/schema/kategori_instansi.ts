import { pgSchema, integer, varchar } from 'drizzle-orm/pg-core';

const appSchema = pgSchema('proper')

export const kategoriInstansi = appSchema.table('kategori_instansi', {
  id: integer('id').primaryKey().notNull(),
  nama: varchar('nama', { length: 255 }).notNull(),
});