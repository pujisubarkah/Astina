import { pgSchema, serial, varchar } from 'drizzle-orm/pg-core'

const appSchema = pgSchema('proper')

export const pelatihan = appSchema.table('pelatihan', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
})


