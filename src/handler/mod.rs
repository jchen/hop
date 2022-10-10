use worker::*;

#[macro_use]
mod macros;

use crate::hoppers::*;

pub struct Handler;
impl Hops for Handler {
    hop! {
        [ "g" => Search Google ]
        [ "b" => Search Baidu ]
        [ "yt" => Search YouTube ]
        [ "in" => Search LinkedIn ]
        [ "w", "wiki" => Search Wikipedia ]
        [ "gh" => Custom GitHub ]
        [ "wolf", "wa" => Search WolframAlpha ]
        [ "oeis" => Search Oeis ]
        [ "wut", "mw", "dict" => PathSearch MerriamWebster ]
        [ "cal", "calendar" => Redirect GCal ]
        [ "drive" => Redirect GDrive ]
        [ "mail", "gmail" => Redirect GMail ]
        [ "nyt" => Redirect NewYorkTimes ]
        [ "cab" => Redirect CoursesAtBrown ]
        [ "cr" => Redirect CriticalReview ]
        [ "bgs", "zbgs" => Search GitHubCodeSearchAllRepos ]
        [ "mbgs" => Search GitHubCodeSearchMyRepos ]
        [ "cf" => Redirect Cloudflare ]
        [ "leet", "lc" => Search LeetCode ]
        [ "ol" => Redirect Overleaf ]
        [ "ask" => Redirect Ask ]
        [ "@ln" => Custom Ln ]
        default [ Search Google ]
        empty [ Redirect Hop ]
    }
}
impl SearchExtractable for Handler {
    extract! {
        [ Search Google ]
        [ Search Baidu ]
        [ Search YouTube ]
        [ Search LinkedIn ]
        [ Search Wikipedia ]
        [ Search GitHub ]
        [ Search WolframAlpha ]
        [ Search Oeis ]
        [ Search MerriamWebster ]
        [ Search GitHubCodeSearchAllRepos ]
        [ Search Hop ]
        [ Search LeetCode ]
    }
}

// Lift these into the global scope
pub fn hop(query: &str) -> Url {
    Handler::hop(query)
}
pub fn doc() -> String {
    Handler::doc()
}
pub fn extract(url: &str) -> Option<String> {
    Handler::extract(url)
}
