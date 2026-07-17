import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { existsSync } from 'node:fs';
import postgres from 'postgres';

async function main() {
	if (!existsSync('./db/migrations/meta/_journal.json')) {
		console.log('No migrations found; skipping');
		return;
	}

	const client = postgres(process.env.DATABASE_URL!, { max: 1 });
	const db = drizzle(client);

	console.log('Running migrations...');
	await migrate(db, { migrationsFolder: './db/migrations' });
	console.log('Migrations complete');

	await client.end();
}

main().catch((err) => {
	console.error('Migration failed:', err);
	process.exit(1);
});
