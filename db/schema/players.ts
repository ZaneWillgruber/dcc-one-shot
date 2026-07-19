import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { crawls } from './crawls';
import { user } from './auth';

export const players = pgTable('players', {
	id: uuid().defaultRandom().primaryKey(),
	crawlId: uuid()
		.notNull()
		.references(() => crawls.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	userId: uuid()
		.notNull()
		.references(() => user.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
});

export const playersRelations = relations(players, ({ one }) => ({
	crawl: one(crawls, {
		fields: [players.crawlId],
		references: [crawls.id],
	}),
	user: one(user, {
		fields: [players.userId],
		references: [user.id],
	}),
}));
