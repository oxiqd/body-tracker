import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

export const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      port: 5432,
      user: 'bodytracker',
      password: 'bodytracker',
      database: 'bodytracker',
    }),
  }),
})
