use percent_encoding::percent_decode;
use worker::*;

mod files;
mod globals;
mod handler;
pub use handler::*;
mod hoppers;
mod hops;
pub use hops::*;
mod utils;

fn url_to_response(url: Url) -> Result<Response> {
    Response::redirect(url)
}

fn search_route(req: Request, _ctx: worker::RouteContext<()>) -> Result<Response> {
    let url = req.url()?;
    let mut query_params = url.query_pairs();

    // Finds the q=___ parameter
    let query = query_params
        .find(|(k, _)| k == globals::QUERY_KEY)
        .map(|(_, v)| v.to_string());

    // If query q header is empty, redirect to the main page
    match query {
        Some(q) => url_to_response(hop(&q)),
        None => Response::ok("Hop search?"),
    }
}

fn wildcard_route(_req: Request, ctx: worker::RouteContext<()>) -> Result<Response> {
    // Default
    let default = String::from("");
    // Gets /:q wildcard from context
    let query = ctx.param("q").unwrap_or(&default);
    // Decodes the percent-encoded query
    let url = hop(&percent_decode(query.as_bytes()).decode_utf8().unwrap());
    // Redirects to the URL
    url_to_response(url)
}

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    utils::log_request(&req);

    let router = Router::new();

    router
        .get("/", files::index)
        .get("/opensearch.xml", files::opensearch)
        .get("/icon.png", files::icon)
        .get("/search", search_route)
        .get("/:q", wildcard_route)
        .run(req, env)
        .await
}
