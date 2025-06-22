# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Use `yarn` as the package manager for this project:

- `yarn dev` - Start development server with Tailwind CSS watch mode and Wrangler local development
- `yarn test` - Run Jest integration tests 
- `yarn deploy` - Build CSS and deploy to Cloudflare Workers
- `yarn start-stackblitz` - Start development server for StackBlitz environment

## Architecture Overview

**hop** is a lightweight bookmarking tool that replaces your browser's default search engine. It's built as a Cloudflare Worker using Hono for routing.

### Core Components

- **Entry Point**: `src/index.ts` - Hono app with static file serving and search routing
- **Search Handler**: `src/utils/handler.ts` - Main query processing logic that iterates through hoppers
- **Hopper System**: Extensible search providers organized by category:
  - `src/utils/hoppers/` - Contains provider implementations (code, entertainment, math, reference, social)
  - `src/utils/types.ts` - Base classes `QuerySearch` and `PathSearch` for different search patterns
  - `src/utils/hoppers.ts` - Registry of all active hoppers

### Search Flow

1. Query comes in via `/search?q=` or `/:q` routes
2. `handle()` function iterates through registered hoppers
3. Each hopper checks if it matches the query pattern
4. First match wins, or defaults to Google search
5. Returns redirect to the appropriate URL

### Hopper Types

- **QuerySearch**: For search engines that use query parameters (Google, Wikipedia, etc.)
- **PathSearch**: For sites that use path-based routing (Merriam-Webster dictionary, etc.)

### Testing

Uses Jest with Miniflare environment for Cloudflare Workers testing. Tests are located in `src/index.test.ts` and cover both static file serving and search functionality.

### Static Assets

Located in `assets/static/` and served via Hono's static middleware:
- `index.html` - Homepage with search interface
- `base.css` - Tailwind input file 
- `index.css` - Generated Tailwind output
- `opensearch.xml` - Browser search engine integration

The build process compiles Tailwind CSS from `base.css` to `index.css` before deployment.