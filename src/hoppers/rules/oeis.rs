use super::*;

pub struct Oeis {}
impl Domain for Oeis {
    const URL: &'static str = "https://oeis.org/";
    const DOMAIN_DOC: &'static str = "OEIS homepage";
}
impl SearchRedirectDomain for Oeis {
    const SEARCH_URL: &'static str = "https://oeis.org/search";
    const QUERY_KEY: &'static str = "q";
    const SEARCH_DOC: &'static str = "perform an OEIS search for an integer sequence";
}
