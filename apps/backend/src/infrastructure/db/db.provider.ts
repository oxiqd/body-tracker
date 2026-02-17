import { Provider } from '@nestjs/common';
import { Kysely, PostgresDialect, sql } from 'kysely';
import { Pool } from 'pg';
import { getPgPoolConfig } from '../../config/env';

/*
  DB_PROVIDER — токен, через который Nest понимает, что это за зависимость
  useFactory — функция, которая создаёт экземпляр Kysely
  Pool — пул соединений Postgres
*/

export const DB_PROVIDER = 'DB_PROVIDER';

async function ensureSchema(db: Kysely<any>) {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('password_hash', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable('weights')
    .ifNotExists()
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('user_id', 'text', (col) =>
      col.notNull().references('users.id').onDelete('cascade'),
    )
    .addColumn('date', 'timestamptz', (col) => col.notNull())
    .addColumn('weight', 'real', (col) => col.notNull())
    .execute();
}

export const dbProvider: Provider = {
  provide: DB_PROVIDER,
  useFactory: async () => {
    const db = new Kysely<any>({
      dialect: new PostgresDialect({
        pool: new Pool(getPgPoolConfig()),
      }),
    });

    await ensureSchema(db);
    return db;
  },
};
