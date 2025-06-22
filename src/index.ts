import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
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

const app = new Hono();

// Static Content
app.get('/', serveStatic({ path: './static/index.html' }));
app.get('/index.css', serveStatic({ path: './static/index.css' }));
app.get('/icon.png', serveStatic({ path: './static/icon.png' }));
app.get('/opensearch.xml', serveStatic({ path: './static/opensearch.xml' }));

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
