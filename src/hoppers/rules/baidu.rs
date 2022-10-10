use super::*;

pub struct Baidu {}
impl Domain for Baidu {
    const URL: &'static str = "https://www.baidu.com/";
    const DOMAIN_DOC: &'static str = "Baidu homepage";
}
impl SearchRedirectDomain for Baidu {
    const SEARCH_URL: &'static str = "https://www.baidu.com/s";
    const QUERY_KEY: &'static str = "wd";
    const SEARCH_DOC: &'static str = "perform a Baidu search";
}
