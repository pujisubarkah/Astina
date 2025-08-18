import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core'

export const abstract = pgTable('abstract', {
  id: serial('id').primaryKey(),
  proper_id: integer('proper_id'),
  abstract: text('abstract'),
  kata_kunci: text('kata_kunci'),
  nilai_ekonomi: text('nilai_ekonomi'),
  tanggal_mulai: text('tanggal_mulai'),
  tanggal_akhir: text('tanggal_akhir'),
})
