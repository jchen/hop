use super::*;

pub struct Ln {}
impl Hops for Ln {
    fn hop(query: &str) -> Url {
        const URL: &str = "https://jc.hn/api/pretty/create";
        // Splits query into a list of words.
        let words = query.split_whitespace().collect::<Vec<_>>();
        let mut url = Url::parse(URL).unwrap();
        match words.len() {
            1 => {
                url.query_pairs_mut().append_pair("url", words[0]);
                url
            }
            2 => {
                url.query_pairs_mut().append_pair("url", words[0]);
                url.query_pairs_mut().append_pair("stub", words[1]);
                url
            }
            _ => url,
        }
    }
    fn doc() -> String {
        "Create a shortlink".into()
    }
}
