import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { getPgPoolConfig } from '../../config/env'

export const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool(getPgPoolConfig()),
  }),
})
