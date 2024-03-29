import { GitHub, GitHubCodeSearch, LeetCode } from './hoppers/code';
import { YouTube } from './hoppers/entertainment';
import { OEIS, WolframAlpha } from './hoppers/math';
import { Baidu, Google, GoogleScholar, MerriamWebster, Wikipedia } from './hoppers/reference';
import { LinkedIn } from './hoppers/social';
import { Hops } from './types';

let hoppers: (typeof Hops)[] = [
	Google,
	GoogleScholar,
	Baidu,
	YouTube,
	LinkedIn,
	Wikipedia,
	GitHub,
	WolframAlpha,
	OEIS,
	MerriamWebster,
	GitHubCodeSearch,
	LeetCode,
];

export default hoppers;
