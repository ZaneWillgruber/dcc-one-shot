import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const createDb = () =>
	drizzle(postgres(process.env.DATABASE_URL!), { schema });

declare global {
	var __db: ReturnType<typeof createDb> | undefined;
}

export const db = global.__db ?? createDb();

if (process.env.NODE_ENV !== 'production') global.__db = db;
