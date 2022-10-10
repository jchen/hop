use super::handler::doc;
use worker::*;

const DOC_MACRO: &str = r#"<!-- DOC -->"#;

pub fn index(_req: Request, _ctx: RouteContext<()>) -> Result<Response> {
    let content = include_str!("static/index.html").to_string();
    Response::from_html(content.replace(DOC_MACRO, &doc()))
}

pub fn opensearch(_req: Request, _ctx: RouteContext<()>) -> Result<Response> {
    let mut headers = Headers::new();
    headers
        .set("Content-Type", "application/opensearchdescription+xml")
        .unwrap();
    Ok(Response::from_html(include_str!("static/opensearch.xml"))?.with_headers(headers))
}

pub fn icon(_req: Request, _ctx: RouteContext<()>) -> Result<Response> {
    let mut headers = Headers::new();
    headers.set("Content-Type", "image/png").unwrap();
    Ok(Response::from_bytes(include_bytes!("static/icon.png").to_vec())?.with_headers(headers))
}
