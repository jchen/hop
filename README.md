# 🐇 hop
[![Deploy](https://github.com/jchen/hop/actions/workflows/Deploy.yml/badge.svg)](https://github.com/jchen/hop/actions/workflows/Deploy.yml)

*bunnies be hopping*

**hop** is a lightweight bookmarking tool, intended to replace your default browser search engine. It is heavily inspired by [taneliang/neh](https://github.com/taneliang/neh), "[bunnylol](https://developers.facebook.com/blog/post/2020/06/03/build-smart-bookmarking-tool-rust-rocket/)", and the original [bunny1](https://github.com/ccheever/bunny1). 

It's written in Rust, intended to be compiled to WebAssembly and wrapped/served as a serverless Cloudflare Edge Worker. 

This was mostly an excuse for me to learn Rust (and Rust macros!), and also to make a small, light & fun HTML/CSS webpage (the landing page). I also use this day-to-day as my default search engine. 

## prereqs
You'll need `rustup` and `cargo`: 
```sh
curl https://sh.rustup.rs -sSf | sh
```
```sh
npm install -g wrangler
```

## build/deploy/test
```sh
cargo build && wrangler publish
```
You can also `cargo test` and `wrangler dev`, etc...

GitHub actions isn't powerful enough to build Rust/wasm so it must be manually published. 
