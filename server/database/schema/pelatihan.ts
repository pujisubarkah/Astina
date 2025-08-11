import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'

export const pelatihan = pgTable('pelatihan', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
})


