use super::*;

pub struct GitHubCodeSearchAllRepos {}
impl Domain for GitHubCodeSearchAllRepos {
    const URL: &'static str = "https://cs.github.com/?scopeName=All+repos&scope=";
    const DOMAIN_DOC: &'static str = "GitHub Code Search (all repos)";
}
impl SearchRedirectDomain for GitHubCodeSearchAllRepos {
    const SEARCH_URL: &'static str = "https://cs.github.com/?scopeName=All+repos&scope=";
    const QUERY_KEY: &'static str = "q";
    const SEARCH_DOC: &'static str = "perform a GitHub search on all repos";
}

pub struct GitHubCodeSearchMyRepos {}
impl Domain for GitHubCodeSearchMyRepos {
    const URL: &'static str = "https://cs.github.com/?scope=owner:jchen&scopeName=My+repos";
    const DOMAIN_DOC: &'static str = "GitHub Code Search (my repos)";
}
impl SearchRedirectDomain for GitHubCodeSearchMyRepos {
    const SEARCH_URL: &'static str = "https://cs.github.com/?scope=owner:jchen&scopeName=My+repos";
    const QUERY_KEY: &'static str = "q";
    const SEARCH_DOC: &'static str = "perform a GitHub search on my repos";
}
