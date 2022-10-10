use super::*;

pub struct LinkedIn {}
impl Domain for LinkedIn {
    const URL: &'static str = "https://www.linkedin.com";
    const DOMAIN_DOC: &'static str = "LinkedIn homepage";
}
impl SearchRedirectDomain for LinkedIn {
    const SEARCH_URL: &'static str = "https://www.linkedin.com/search/results/all/";
    const QUERY_KEY: &'static str = "keywords";
    const SEARCH_DOC: &'static str = "perform a LinkedIn search";
}
