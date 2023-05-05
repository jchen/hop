/**
 * End-to-end tests for the app.
 * Relies on Jest Cloudflare Workers testing backend.
 */

import app from '.';

describe('Static tests', () => {
	it('Home page should load', async () => {
		const res = await app.request('http://localhost/');
		expect(res.status).toBe(200);
	});

	it('Opensearch schema page should load', async () => {
		const res = await app.request('http://localhost/opensearch.xml');
		expect(res.status).toBe(200);
	});
});

describe('Google search', () => {
	it('Google without search term, path', async () => {
		const res = await app.request('http://localhost/g');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/');
	});

	it('Google without search term, param', async () => {
		const res = await app.request('http://localhost/search?q=g');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/');
	});

	it('Google with search term', async () => {
		const res = await app.request('http://localhost/search?q=g hello');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/search?q=hello');
	});

	it('Google with search term, multiple words', async () => {
		const res = await app.request('http://localhost/search?q=g hello world');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/search?q=hello+world');
	});

	it('Google with search term, rewrites', async () => {
		const res = await app.request(
			'http://localhost/search?q=g https://www.youtube.com/results?search_query=hello+world'
		);
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/search?q=hello+world');
	});
});
