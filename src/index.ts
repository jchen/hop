import { Hono } from 'hono';
import { HOMEPAGE } from './utils/constants';
import { handle } from './utils/handler';

function safeDecodeURIComponent(str: string): string {
	try {
		return decodeURIComponent(str);
	} catch (error) {
		// If decoding fails, try to decode what we can by replacing malformed sequences
		// Replace lone % or malformed %xx with %25
		const safeBits = str.replace(/%(?![0-9A-Fa-f]{2})/g, '%25');
		try {
			return decodeURIComponent(safeBits);
		} catch (error) {
			// If still fails, return the original string
			return str;
		}
	}
}

type Bindings = {
	ASSETS: {
		fetch: (input: RequestInfo) => Promise<Response>;
	};
};

const app = new Hono<{ Bindings: Bindings }>();

// Static Content using ASSETS binding for Wrangler v4
app.get('/', async (c) => {
	if (c.env?.ASSETS) {
		const url = new URL('/static/index.html', c.req.url);
		const response = await c.env.ASSETS.fetch(url.toString());
		// Ensure proper charset for HTML files
		if (response.status === 200) {
			const newResponse = new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: {
					...Object.fromEntries(response.headers),
					'Content-Type': 'text/html; charset=utf-8'
				}
			});
			return newResponse;
		}
		return response;
	}
	// Fallback for tests
	return new Response('<html><head><title>hop</title></head><body>test</body></html>', {
		headers: { 'Content-Type': 'text/html; charset=utf-8' }
	});
});
app.get('/index.css', async (c) => {
	if (c.env?.ASSETS) {
		const url = new URL('/static/index.css', c.req.url);
		return c.env.ASSETS.fetch(url.toString());
	}
	return new Response('body { margin: 0; }', {
		headers: { 'Content-Type': 'text/css' }
	});
});
app.get('/icon.png', async (c) => {
	if (c.env?.ASSETS) {
		const url = new URL('/static/icon.png', c.req.url);
		return c.env.ASSETS.fetch(url.toString());
	}
	return new Response('mock-png-data', {
		headers: { 'Content-Type': 'image/png' }
	});
});
app.get('/opensearch.xml', async (c) => {
	if (c.env?.ASSETS) {
		const url = new URL('/static/opensearch.xml', c.req.url);
		return c.env.ASSETS.fetch(url.toString());
	}
	return new Response('<?xml version="1.0"?><OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"></OpenSearchDescription>', {
		headers: { 'Content-Type': 'application/xml' }
	});
});

// Search pathes
app.get('/search', c => {
	try {
		const query = c.req.query('q');
		if (query) {
			let input = decodeURIComponent(query as string).trim();
			return c.redirect(handle(input).toString());
		}
	} catch (error) {
		// Handle malformed URI components by safely decoding the raw query parameter
		const rawQuery = c.req.url.split('?q=')[1];
		if (rawQuery) {
			const queryParam = rawQuery.split('&')[0];
			const input = safeDecodeURIComponent(queryParam).trim();
			return c.redirect(handle(input).toString());
		}
	}
	return c.redirect(HOMEPAGE.toString(), 302);
});

app.get('/:q', c => {
	const q = c.req.param('q').trim();
	return c.redirect(handle(q).toString());
});

export default app;
