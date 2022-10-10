use super::*;

pub struct Cloudflare {}
impl Domain for Cloudflare {
    const URL: &'static str = "https://dash.cloudflare.com/";
    const DOMAIN_DOC: &'static str = "Cloudflare Dashboard";
}
