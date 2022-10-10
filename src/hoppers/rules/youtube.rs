use super::*;

pub struct YouTube {}
impl Domain for YouTube {
    const URL: &'static str = "https://www.youtube.com";
    const DOMAIN_DOC: &'static str = "YouTube homepage";
}
impl SearchRedirectDomain for YouTube {
    const SEARCH_URL: &'static str = "https://www.youtube.com/results";
    const QUERY_KEY: &'static str = "search_query";
    const SEARCH_DOC: &'static str = "perform a YouTube search";
}
