import { Provider } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

/*
  DB_PROVIDER — токен, через который Nest понимает, что это за зависимость
  useFactory — функция, которая создаёт экземпляр Kysely
  Pool — пул соединений Postgres
*/

export const DB_PROVIDER = 'DB_PROVIDER';

export const dbProvider: Provider = {
  provide: DB_PROVIDER,
  useFactory: () => {
    const connectionString = process.env.DATABASE_URL;
    const dbSslEnv = process.env.DB_SSL;
    const useSsl =
      dbSslEnv === 'true' || (dbSslEnv !== 'false' && !!connectionString);

    return new Kysely<any>({
      dialect: new PostgresDialect({
        pool: new Pool({
          ...(connectionString
            ? { connectionString }
            : {
                host: process.env.DB_HOST || 'localhost',
                port: Number(process.env.DB_PORT || 5432),
                user: process.env.DB_USER || 'bodytracker',
                password: process.env.DB_PASSWORD || 'bodytracker',
                database: process.env.DB_NAME || 'bodytracker',
              }),
          ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
        }),
      }),
    });
  },
};
