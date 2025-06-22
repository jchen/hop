import { extract } from './handler';

export abstract class Hops {
	static doc: string;
	static query(q: string): URL | null {
		return null;
	}
	static extract(q: string): string | null {
		return null;
	}
}

export abstract class QuerySearch extends Hops {
	static doc: string;
	static invocations: string[];
	static site: URL;
	static searchUrl: URL;
	static queryKey: string;
	static query(q: string): URL | null {
		// Handle both space and + encoding for spaces
		let normalizedQuery = q.trim().replace(/\+/g, ' ');
		let qWords = normalizedQuery.split(' ');
		if (q && this.invocations.includes(qWords[0])) {
			let subQuery = qWords.slice(1).join(' ');
			return this.bareQuery(subQuery);
		}
		return null;
	}
	static bareQuery(q: string): URL {
		if (!q) {
			return this.site;
		}
		let url = new URL(this.searchUrl.toString());
		url.searchParams.append(this.queryKey, extract(q));
		return url;
	}
	static extract(q: string): string | null {
		try {
			let maybeUrl = new URL(q);
			if (
				maybeUrl.hostname === this.searchUrl.hostname &&
				maybeUrl.pathname === this.searchUrl.pathname
			) {
				return maybeUrl.searchParams.get(this.queryKey);
			}
			return null;
		} catch (e) {
			return null;
		}
	}
}

export abstract class PathSearch extends Hops {
	static doc: string;
	static invocations: string[];
	static site: URL;
	static searchUrl: URL;
	static query(q: string): URL | null {
		// Handle both space and + encoding for spaces
		let normalizedQuery = q.trim().replace(/\+/g, ' ');
		let qWords = normalizedQuery.split(' ');
		if (q && this.invocations.includes(qWords[0])) {
			let subQuery = qWords.slice(1).join(' ');
			if (!subQuery) {
				return this.site;
			}
			return new URL(extract(subQuery), this.searchUrl.toString());
		}
		return null;
	}

	static extract(q: string): string | null {
		try {
			let maybeUrl = new URL(q);
			if (
				maybeUrl.hostname === this.searchUrl.hostname &&
				maybeUrl.pathname.startsWith(this.searchUrl.pathname)
			) {
				return maybeUrl.pathname.slice(this.searchUrl.pathname.length);
			}
			return null;
		} catch (e) {
			return null;
		}
	}
}
