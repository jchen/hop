import { PathSearch, QuerySearch } from '../types';

export class GitHub extends PathSearch {
	static invocations = ['gh'];
	static site = new URL('https://github.com');
	static searchUrl = new URL('https://github.com');
	static doc = 'GitHub';
}

export class GitHubCodeSearch extends QuerySearch {
    static invocations = ['zbgs'];
    static site = new URL('https://github.com/search?type=code');
    static searchUrl = new URL('https://github.com/search?type=code');
    static queryKey = 'q';
}