import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

function getDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  // Common Postgres env vars (including many hosted environments like Replit)
  const host = process.env.PGHOST;
  const port = process.env.PGPORT;
  const user = process.env.PGUSER;
  const password = process.env.PGPASSWORD;
  const database = process.env.PGDATABASE;

  if (host && port && user && password && database) {
    return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
  }

  return undefined;
}

export const databaseUrl = getDatabaseUrl();
export const hasDatabase = Boolean(databaseUrl);

export const pool = hasDatabase
  ? new Pool({ connectionString: databaseUrl })
  : undefined;

export const db = hasDatabase ? drizzle(pool!, { schema }) : undefined;
