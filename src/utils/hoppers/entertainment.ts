import { QuerySearch } from '../types';

export class YouTube extends QuerySearch {
	static invocations = ['yt'];
	static site = new URL('https://www.youtube.com');
	static searchUrl = new URL('https://www.youtube.com/results');
	static queryKey = 'search_query';
	static doc = 'YouTube';
}
