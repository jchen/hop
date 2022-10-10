use super::*;

pub struct GitHub {}
impl Domain for GitHub {
    const URL: &'static str = "https://github.com";
    const DOMAIN_DOC: &'static str = "GitHub homepage";
}
impl SearchRedirectDomain for GitHub {
    const SEARCH_URL: &'static str = "https://github.com/search";
    const QUERY_KEY: &'static str = "q";
    const SEARCH_DOC: &'static str = "perform a GitHub search";
}
pub struct GitHubProfile {}
impl Domain for GitHubProfile {
    const URL: &'static str = "https://github.com";
    const DOMAIN_DOC: &'static str = "GitHub homepage";
}
impl SearchRedirectDomain for GitHubProfile {
    const SEARCH_URL: &'static str = "https://github.com/";
    const QUERY_KEY: &'static str = "";
    const SEARCH_DOC: &'static str = "go to a GitHub profile/repository";
}
impl Hops for GitHub {
    hop! {
        [ "p" => PathSearch GitHubProfile ]
        default [ Search GitHub ]
        empty [ Redirect GitHub ]
    }
}
