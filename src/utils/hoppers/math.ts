import { QuerySearch } from "../types";

export class WolframAlpha extends QuerySearch {
    static invocations = ['wa', 'wolf'];
    static site = new URL('https://www.wolframalpha.com');
    static searchUrl = new URL('https://www.wolframalpha.com/input');
    static queryKey = 'i';
    static doc = 'WolframAlpha';
}

export class OEIS extends QuerySearch {
    static invocations = ['oeis'];
    static site = new URL('https://oeis.org');
    static searchUrl = new URL('https://oeis.org/search');
    static queryKey = 'q';
    static doc = 'OEIS';
}