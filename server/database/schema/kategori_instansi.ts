import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';

export const kategoriInstansi = pgTable('kategori_instansi', {
  id: integer('id').primaryKey().notNull(),
  nama: varchar('nama', { length: 255 }).notNull(),
});