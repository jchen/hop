import { QuerySearch } from '../types';

export class LinkedIn extends QuerySearch {
	static invocations = ['li'];
	static site = new URL('https://www.linkedin.com');
	static searchUrl = new URL('https://www.linkedin.com/search/results/all');
	static queryKey = 'keywords';
	static doc = 'LinkedIn';
}
