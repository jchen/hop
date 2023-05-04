# 🐇 hop
[![Deploy](https://github.com/jchen/hop/actions/workflows/Deploy.yml/badge.svg)](https://github.com/jchen/hop/actions/workflows/Deploy.yml)

*bunnies be hopping*

**hop** is a lightweight bookmarking tool, intended to replace your default browser search engine. It is heavily inspired by [taneliang/neh](https://github.com/taneliang/neh), "[bunnylol](https://developers.facebook.com/blog/post/2020/06/03/build-smart-bookmarking-tool-rust-rocket/)", and the original [bunny1](https://github.com/ccheever/bunny1). 

While originally written in Rust and compiled to WebAssembly, this version is written in TypeScript and uses [Hono](https://hono.dev/) for routing. It still runs on Cloudflare Wrangler. 

## build/deploy/test
```sh
yarn install
yarn dev
```
will get you started. 
```sh
yarn test
```
to run integration tests. 

```sh
yarn deploy
```
to deploy to Cloudflare Wrangler. 
