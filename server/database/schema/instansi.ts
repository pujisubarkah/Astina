import { pgSchema, serial, integer, varchar } from 'drizzle-orm/pg-core'

const appSchema = pgSchema('proper')

export const instansi = appSchema.table('instansi', {
  id: serial('id').primaryKey(),
  instansi_id: integer('instansi_id'),
  nama_instansi: varchar('nama_instansi', { length: 255 }),
  id_instansi_kategori: integer('id_instansi_kategori'),
  id_kabupaten: integer('id_kabupaten'),
  id_provinsi: integer('id_provinsi'),
})