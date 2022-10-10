use super::*;

pub struct Hop {}
impl Domain for Hop {
    const URL: &'static str = "https://hop.jiahua.io";
    const DOMAIN_DOC: &'static str = "Hop homepage";
}
impl SearchRedirectDomain for Hop {
    const SEARCH_URL: &'static str = "https://hop.jiahua.io/search";
    const QUERY_KEY: &'static str = "q";
    const SEARCH_DOC: &'static str = "perform a Hop search";
}
