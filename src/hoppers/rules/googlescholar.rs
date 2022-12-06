use super::*;

pub struct GoogleScholar {}
impl Domain for GoogleScholar {
    const URL: &'static str = "https://scholar.google.com/";
    const DOMAIN_DOC: &'static str = "Google Scholar Search";
}
impl SearchRedirectDomain for GoogleScholar {
    const SEARCH_URL: &'static str = "https://scholar.google.com/scholar";
    const QUERY_KEY: &'static str = "q";
    const SEARCH_DOC: &'static str = "perform a Google Scholar search";
}
