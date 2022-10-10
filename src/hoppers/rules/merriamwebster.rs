use super::*;

pub struct MerriamWebster {}
impl Domain for MerriamWebster {
    const URL: &'static str = "https://www.merriam-webster.com";
    const DOMAIN_DOC: &'static str = "Merriam-Webster homepage";
}
impl SearchRedirectDomain for MerriamWebster {
    const SEARCH_URL: &'static str = "https://www.merriam-webster.com/dictionary/";
    const QUERY_KEY: &'static str = "";
    const SEARCH_DOC: &'static str = "perform a Merriam-Webster search";
}
