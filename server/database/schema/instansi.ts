import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core'

export const instansi = pgTable('instansi', {
  id: serial('id').primaryKey(),
  instansiId: integer('instansi_id'),
  namaInstansi: varchar('nama_instansi', { length: 255 }),
  idInstansiKategori: integer('id_instansi_kategori'),
})