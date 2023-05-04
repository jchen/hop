import { HOMEPAGE } from './constants';
import hoppers from './hoppers';
import Google from './hoppers/google';

export function handle(q: string): URL {
	if (q) {
		for (let Hopper of hoppers) {
			let url = Hopper.query(q);
			if (url) {
				return url;
			}
		}
		return Google.bareQuery(q);
	}
	return HOMEPAGE;
}

export function extract(q: string): string {
	for (let Hopper of hoppers) {
		let extracted = Hopper.extract(q);
		if (extracted) {
			return extracted;
		}
	}
	return q;
}
