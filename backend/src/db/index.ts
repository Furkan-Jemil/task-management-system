import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema/index';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const useLocalDb = process.env.USE_LOCAL_DB === 'true';

let db: any;

if (useLocalDb) {
    console.log('Using local SQLite database...');
    // Create a local SQLite database in the root of the backend folder
    const sqlite = new Database(path.resolve(process.cwd(), 'sqlite.db'));
    db = drizzleSqlite(sqlite, { schema });
} else {
    console.log('Using Neon PostgreSQL database...');
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set');
    }
    const sql = neon(process.env.DATABASE_URL);
    db = drizzleNeon(sql, { schema });
}

export { db };
export * from './schema/index';
