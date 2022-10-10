use super::*;

pub struct WolframAlpha {}
impl Domain for WolframAlpha {
    const URL: &'static str = "https://www.wolframalpha.com";
    const DOMAIN_DOC: &'static str = "WolframAlpha homepage";
}
impl SearchRedirectDomain for WolframAlpha {
    const SEARCH_URL: &'static str = "https://www.wolframalpha.com/input/";
    const QUERY_KEY: &'static str = "i";
    const SEARCH_DOC: &'static str = "perform a WolframAlpha search";
}
