import { relations } from 'drizzle-orm';
import { pgTable, uuid, integer, timestamp, text } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { players } from './players';

export const crawls = pgTable('crawls', {
	id: uuid().defaultRandom().primaryKey(),
	name: text().notNull(),
	ownerId: uuid()
		.notNull()
		.references(() => user.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	floor: integer().default(1).notNull(),
	startsAt: timestamp().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});

export const crawlsRelations = relations(crawls, ({ one, many }) => ({
	owner: one(user, {
		fields: [crawls.ownerId],
		references: [user.id],
	}),
	players: many(players),
}));
