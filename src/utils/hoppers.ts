import Google from './hoppers/google';
import { Hops, PathSearch, QuerySearch } from './types';

let hoppers: (typeof Hops)[] = [
	Google,
	class GoogleScholar extends QuerySearch {
		static invocations = ['gs'];
		static site = new URL('https://scholar.google.com');
		static searchUrl = new URL('https://scholar.google.com/scholar');
		static queryKey = 'q';
		static doc = 'Google Scholar';
	},
	class Baidu extends QuerySearch {
		static invocations = ['b'];
		static site = new URL('https://www.baidu.com');
		static searchUrl = new URL('https://www.baidu.com/s');
		static queryKey = 'wd';
		static doc = 'Baidu';
	},
	class YouTube extends QuerySearch {
		static invocations = ['yt'];
		static site = new URL('https://www.youtube.com');
		static searchUrl = new URL('https://www.youtube.com/results');
		static queryKey = 'search_query';
		static doc = 'YouTube';
	},
	class LinkedIn extends QuerySearch {
		static invocations = ['li'];
		static site = new URL('https://www.linkedin.com');
		static searchUrl = new URL('https://www.linkedin.com/search/results/all');
		static queryKey = 'keywords';
		static doc = 'LinkedIn';
	},
	class Wikipedia extends QuerySearch {
		static invocations = ['w', 'wiki'];
		static site = new URL('https://en.wikipedia.org');
		static searchUrl = new URL('https://en.wikipedia.org/w/index.php');
		static queryKey = 'search';
		static doc = 'Wikipedia';
	},
	class GitHub extends PathSearch {
		static invocations = ['gh'];
		static site = new URL('https://github.com');
		static searchUrl = new URL('https://github.com');
		static doc = 'GitHub';
	},
	class WolframAlpha extends QuerySearch {
		static invocations = ['wa'];
		static site = new URL('https://www.wolframalpha.com');
		static searchUrl = new URL('https://www.wolframalpha.com/input');
		static queryKey = 'i';
		static doc = 'WolframAlpha';
	},
	class OEIS extends QuerySearch {
		static invocations = ['oeis'];
		static site = new URL('https://oeis.org');
		static searchUrl = new URL('https://oeis.org/search');
		static queryKey = 'q';
		static doc = 'OEIS';
	},
	class MerriamWebster extends PathSearch {
		static invocations = ['wut', 'dict', 'mw'];
		static site = new URL('https://www.merriam-webster.com');
		static searchUrl = new URL('https://www.merriam-webster.com/dictionary');
		static doc = 'Merriam-Webster';
	},
	class GitHubCodeSearch extends QuerySearch {
		static invocations = ['zbgs'];
		static site = new URL('https://github.com/search?type=code');
		static searchUrl = new URL('https://github.com/search?type=code');
		static queryKey = 'q';
	},
	class LeetCode extends QuerySearch {
		static invocations = ['lc'];
		static site = new URL('https://leetcode.com/problemset/all');
		static searchUrl = new URL('https://leetcode.com/problemset/all');
		static queryKey = 'search';
		static doc = 'LeetCode';
	},
];

export default hoppers;
