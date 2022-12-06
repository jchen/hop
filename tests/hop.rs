use hop::*;
use worker::*;

#[macro_use]
mod macros;

#[test]
fn empty() {
    assert_hop_redirect!("" => "https://hop.jiahua.io");
}

#[test]
fn google() {
    assert_hop_redirect!("g" => "https://www.google.com");
    assert_hop_redirect!("g hello" => "https://www.google.com/search?q=hello");
    assert_hop_redirect!("g hello world" => "https://www.google.com/search?q=hello+world");
    assert_hop_redirect!("g https://www.youtube.com/results?search_query=hello+world" => "https://www.google.com/search?q=hello+world");
}

#[test]
fn google_extract() {
    assert_eq!(
        extract("https://www.google.com/search?q=hello"),
        Some("hello".into())
    );
    assert_eq!(
        extract("https://www.google.com/search?q=hello+world"),
        Some("hello world".into())
    );
}

#[test]
fn google_wildcard() {
    assert_hop_redirect!("hello" => "https://www.google.com/search?q=hello");
    assert_hop_redirect!("hello world" => "https://www.google.com/search?q=hello+world");
}

#[test]
fn github() {
    assert_hop_redirect!("gh" => "https://github.com");
    assert_hop_redirect!("gh hello" => "https://github.com/search?q=hello");
}

#[test]
fn github_extract() {
    assert_eq!(
        extract("https://github.com/search?q=hello"),
        Some("hello".into())
    );
}

#[test]
fn github_profile() {
    assert_hop_redirect!("gh p jchen" => "https://github.com/jchen");
}

#[test]
fn youtube() {
    assert_hop_redirect!("yt" => "https://www.youtube.com");
    assert_hop_redirect!("yt hello" => "https://www.youtube.com/results?search_query=hello");
    assert_hop_redirect!("yt hello world" => "https://www.youtube.com/results?search_query=hello+world");
    assert_hop_redirect!("yt never gonna give you up" => "https://www.youtube.com/results?search_query=never+gonna+give+you+up");
}

#[test]
fn youtube_extract() {
    assert_eq!(
        extract("https://www.youtube.com/results?search_query=hello"),
        Some("hello".into())
    );
    assert_eq!(
        extract("https://www.youtube.com/results?search_query=hello+world"),
        Some("hello world".into())
    );
}

#[test]
fn linkedin() {
    assert_hop_redirect!("li" => "https://www.linkedin.com");
    assert_hop_redirect!("li jiahua" => "https://www.linkedin.com/search/results/all/?keywords=jiahua");
    assert_hop_redirect!("li jiahua chen" => "https://www.linkedin.com/search/results/all/?keywords=jiahua+chen");
}

#[test]
fn linkedin_extract() {
    assert_eq!(
        extract("https://www.linkedin.com/search/results/all/?keywords=jiahua"),
        Some("jiahua".into())
    );
    assert_eq!(
        extract("https://www.linkedin.com/search/results/all/?keywords=jiahua+chen"),
        Some("jiahua chen".into())
    );
}

#[test]
fn oeis() {
    assert_hop_redirect!("oeis 1 1 2 3 5" => "https://oeis.org/search?q=1+1+2+3+5")
}

#[test]
fn oeis_extract() {
    assert_eq!(
        extract("https://oeis.org/search?q=1+1+2+3+5"),
        Some("1 1 2 3 5".into())
    );
}

#[test]
fn mw() {
    assert_hop_redirect!("wut" => "https://www.merriam-webster.com");
    assert_hop_redirect!("wut hello" => "https://www.merriam-webster.com/dictionary/hello");
    assert_hop_redirect!("wut onomatopoeia" => "https://www.merriam-webster.com/dictionary/onomatopoeia");
    assert_hop_redirect!("mw onomatopoeia" => "https://www.merriam-webster.com/dictionary/onomatopoeia");
    assert_hop_redirect!("mw https://www.google.com/search?q=hello" => "https://www.merriam-webster.com/dictionary/hello");
}

#[test]
fn leetcode() {
    assert_hop_redirect!("lc" => "https://leetcode.com/problemset/all/");
    assert_hop_redirect!("lc 3sum" => "https://leetcode.com/problemset/all/?search=3sum");
    assert_hop_redirect!("lc two sum" => "https://leetcode.com/problemset/all/?search=two+sum");
    assert_hop_redirect!("lc https://www.google.com/search?q=two+sum" => "https://leetcode.com/problemset/all/?search=two+sum");
}

#[test]
fn ln() {
    assert_hop_redirect!("@ln" => "https://jc.hn/api/pretty/create");
    assert_hop_redirect!("@ln https://www.google.com/" => "https://jc.hn/api/pretty/create?url=https%3A%2F%2Fwww.google.com%2F");
    assert_hop_redirect!("@ln https://www.google.com/search?q=two+sum" => "https://jc.hn/api/pretty/create?url=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dtwo%2Bsum");
    assert_hop_redirect!("@ln https://www.youtube.com/ yoot" => "https://jc.hn/api/pretty/create?url=https%3A%2F%2Fwww.youtube.com%2F&stub=yoot");
}
