import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { HOMEPAGE } from './utils/constants';
import { handle } from './utils/handler';

const app = new Hono();

// Static Content
app.get('/', serveStatic({ path: './static/index.html' }));
app.get('/index.css', serveStatic({ path: './static/index.css' }));
app.get('/icon.png', serveStatic({ path: './static/icon.png' }));
app.get('/opensearch.xml', serveStatic({ path: './static/opensearch.xml' }));

// Search pathes
app.get('/search', c => {
	const query = c.req.query('q');
	if (query) {
		let input = decodeURIComponent(query as string).trim();
		return c.redirect(handle(input).toString());
	}
	return c.redirect(HOMEPAGE.toString(), 302);
});

app.get('/:q', c => {
	const q = c.req.param('q').trim();
	return c.redirect(handle(q).toString());
});

export default app;
