import { Provider } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { getPgPoolConfig } from '../../config/env';

/*
  DB_PROVIDER — токен, через который Nest понимает, что это за зависимость
  useFactory — функция, которая создаёт экземпляр Kysely
  Pool — пул соединений Postgres
*/

export const DB_PROVIDER = 'DB_PROVIDER';

export const dbProvider: Provider = {
  provide: DB_PROVIDER,
  useFactory: () => {
    return new Kysely<any>({
      dialect: new PostgresDialect({
        pool: new Pool(getPgPoolConfig()),
      }),
    });
  },
};
