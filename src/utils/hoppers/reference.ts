import { PathSearch, QuerySearch } from '../types';

export class Google extends QuerySearch {
	static invocations = ['g'];
	static site = new URL('https://www.google.com');
	static searchUrl = new URL('https://www.google.com/search');
	static queryKey = 'q';
	static doc = 'Google Search';
}

export class GoogleScholar extends QuerySearch {
	static invocations = ['gs'];
	static site = new URL('https://scholar.google.com');
	static searchUrl = new URL('https://scholar.google.com/scholar');
	static queryKey = 'q';
	static doc = 'Google Scholar';
}

export class Baidu extends QuerySearch {
	static invocations = ['b'];
	static site = new URL('https://www.baidu.com');
	static searchUrl = new URL('https://www.baidu.com/s');
	static queryKey = 'wd';
	static doc = 'Baidu';
}

export class Wikipedia extends QuerySearch {
	static invocations = ['w', 'wiki'];
	static site = new URL('https://en.wikipedia.org');
	static searchUrl = new URL('https://en.wikipedia.org/w/index.php');
	static queryKey = 'search';
	static doc = 'Wikipedia';
}

export class MerriamWebster extends PathSearch {
	static invocations = ['wut', 'dict', 'mw'];
	static site = new URL('https://www.merriam-webster.com');
	static searchUrl = new URL('https://www.merriam-webster.com/dictionary');
	static doc = 'Merriam-Webster';
}
