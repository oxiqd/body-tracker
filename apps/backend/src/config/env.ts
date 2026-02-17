import type { PoolConfig } from 'pg';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnvFiles(): void {
  if (typeof process.loadEnvFile !== 'function') return;

  const candidates = [
    resolve(process.cwd(), '.env'),
    resolve(process.cwd(), '../../.env'),
  ];

  for (const filePath of candidates) {
    if (existsSync(filePath)) {
      process.loadEnvFile(filePath);
    }
  }
}

loadEnvFiles();

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function parsePort(value: string | undefined, fallback: number): number {
  const parsed = Number(value ?? fallback);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric env var value: ${value}`);
  }
  return parsed;
}

const dbConnectionString = process.env.DATABASE_URL;
const dbSslEnv = process.env.DB_SSL;
const useDbSsl =
  dbSslEnv === 'true' || (dbSslEnv !== 'false' && !!dbConnectionString);

export const appEnv = {
  port: parsePort(process.env.PORT, 3000),
  jwtSecret: requiredEnv('JWT_SECRET'),
};

export function getPgPoolConfig(): PoolConfig {
  const baseConfig: PoolConfig = dbConnectionString
    ? { connectionString: dbConnectionString }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parsePort(process.env.DB_PORT, 5432),
        user: process.env.DB_USER || 'bodytracker',
        password: process.env.DB_PASSWORD || 'bodytracker',
        database: process.env.DB_NAME || 'bodytracker',
      };

  return useDbSsl
    ? { ...baseConfig, ssl: { rejectUnauthorized: false } }
    : baseConfig;
}
