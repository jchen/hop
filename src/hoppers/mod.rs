mod rules;
pub use rules::*;

pub use super::*;

pub struct Custom<T>(T);
impl<T> Hops for Custom<T>
where
    T: Hops,
{
    fn hop(query: &str) -> Url {
        T::hop(query)
    }
    fn doc() -> String {
        T::doc()
    }
}

pub trait Domain {
    const URL: &'static str;
    const DOMAIN_DOC: &'static str;
}

pub struct Redirect<T>(T);
impl<T> Hops for Redirect<T>
where
    T: Domain,
{
    fn hop(_query: &str) -> Url {
        Url::parse(T::URL).unwrap()
    }
    fn doc() -> String {
        T::DOMAIN_DOC.into()
    }
}

pub trait SearchRedirectDomain: Domain {
    const SEARCH_URL: &'static str;
    const QUERY_KEY: &'static str;
    const SEARCH_DOC: &'static str;
}

pub struct Search<T>(T);
impl<T> Hops for Search<T>
where
    T: SearchRedirectDomain,
{
    fn hop(query: &str) -> Url {
        if query.is_empty() {
            return Url::parse(T::URL).unwrap();
        }
        let mut url = Url::parse(T::SEARCH_URL).unwrap();
        let q = match extract(query) {
            Some(q) => q,
            None => query.into(),
        };
        url.query_pairs_mut().append_pair(T::QUERY_KEY, &q);
        url
    }
    fn doc() -> String {
        T::SEARCH_DOC.into()
    }
}
impl<T> SearchExtractable for Search<T>
where
    T: SearchRedirectDomain,
{
    fn extract(url: &str) -> Option<String> {
        let url = Url::parse(url);
        let search_url = Url::parse(T::SEARCH_URL).unwrap();
        match url {
            Ok(url) => {
                if !(url.host_str() == search_url.host_str() && url.path() == search_url.path()) {
                    None
                } else {
                    url.query_pairs()
                        .find(|(k, _)| k == T::QUERY_KEY)
                        .map(|(_, v)| v.to_string())
                }
            }
            Err(_) => None,
        }
    }
}

pub struct PathSearch<T>(T);
impl<T> Hops for PathSearch<T>
where
    T: SearchRedirectDomain,
{
    fn hop(query: &str) -> Url {
        if query.is_empty() {
            return Url::parse(T::URL).unwrap();
        }
        let url = Url::parse(T::SEARCH_URL).unwrap();
        let q = match extract(query) {
            Some(q) => q,
            None => query.into(),
        };
        url.join(&q).unwrap()
    }
    fn doc() -> String {
        T::SEARCH_DOC.into()
    }
}
