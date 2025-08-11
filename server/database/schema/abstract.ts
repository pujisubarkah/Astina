import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core'

export const abstract = pgTable('abstract', {
  id: serial('id').primaryKey(),
  properId: integer('proper_id'),
  abstract: text('abstract'),
  kataKunci: text('kata_kunci'),
})
