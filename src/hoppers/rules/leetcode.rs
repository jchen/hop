use super::*;

pub struct LeetCode {}
impl Domain for LeetCode {
    const URL: &'static str = "https://leetcode.com/problemset/all/";
    const DOMAIN_DOC: &'static str = "LeetCode problems page";
}
impl SearchRedirectDomain for LeetCode {
    const SEARCH_URL: &'static str = "https://leetcode.com/problemset/all/";
    const QUERY_KEY: &'static str = "search";
    const SEARCH_DOC: &'static str = "perform a LeetCode problem search";
}
