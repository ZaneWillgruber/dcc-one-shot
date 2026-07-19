export type CrawlStatus = 'active' | 'upcoming' | 'completed';

export type CrawlRole = 'dm' | 'crawler';

export interface Crawl {
	id: string;
	name: string;
	status: CrawlStatus;
	/** The signed-in user's role in this crawl. */
	role: CrawlRole;
	floor: number;
	partySize: number;
	/** Human-readable schedule or last-played line, e.g. "Fri, 7:00 PM". */
	schedule: string;
}
