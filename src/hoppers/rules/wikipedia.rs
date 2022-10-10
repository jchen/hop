use super::*;

pub struct Wikipedia {}
impl Domain for Wikipedia {
    const URL: &'static str = "https://en.wikipedia.org";
    const DOMAIN_DOC: &'static str = "Wikipedia homepage";
}
impl SearchRedirectDomain for Wikipedia {
    const SEARCH_URL: &'static str = "https://en.wikipedia.org/w/index.php";
    const QUERY_KEY: &'static str = "search";
    const SEARCH_DOC: &'static str = "perform a Wikipedia search";
}
