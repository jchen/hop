use worker::*;

pub trait Hops {
    fn hop(query: &str) -> Url;
    fn doc() -> String;
}

pub trait SearchExtractable {
    fn extract(url: &str) -> Option<String>;
}
