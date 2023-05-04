import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { HOMEPAGE } from './utils/constants';
import { handle } from './utils/handler';

const app = new Hono();

// Static Pages
app.get('/', serveStatic({ path: './static/index.html' }));
app.get('/opensearch.xml', serveStatic({ path: './static/opensearch.xml' }));

// Search pathes
app.get('/search', c => {
	const query = c.req.query('q');
	if (query) {
		let input = decodeURIComponent(query as string);
		return c.redirect(handle(input).toString());
	}
	return c.redirect(HOMEPAGE.toString(), 302);
});

app.get('/:q', c => {
	const q = c.req.param('q');
	return c.redirect(handle(q).toString());
});

export default app;
