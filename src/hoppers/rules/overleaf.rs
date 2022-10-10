use super::*;

pub struct Overleaf {}
impl Domain for Overleaf {
    const URL: &'static str = "https://www.overleaf.com/project";
    const DOMAIN_DOC: &'static str = "Overleaf projects page";
}
