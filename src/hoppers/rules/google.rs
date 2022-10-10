use super::*;

pub struct Google {}
impl Domain for Google {
    const URL: &'static str = "https://www.google.com";
    const DOMAIN_DOC: &'static str = "Google homepage";
}
impl SearchRedirectDomain for Google {
    const SEARCH_URL: &'static str = "https://www.google.com/search";
    const QUERY_KEY: &'static str = "q";
    const SEARCH_DOC: &'static str = "perform a Google search";
}
