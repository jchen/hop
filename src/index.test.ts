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

	it('Disambiguation page should load', async () => {
		const res = await app.request('http://localhost/disambiguate.html');
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

describe('Tracking numbers', () => {
	it('USPS tracking number', async () => {
		const res = await app.request('http://localhost/9400108202310405000000');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://tools.usps.com/go/TrackConfirmAction?tLabels=9400108202310405000000');
	});

	it('UPS tracking number', async () => {
		const res = await app.request('http://localhost/1Z12345E1234567890');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.ups.com/track?tracknum=1Z12345E1234567890');
	});

	it('FedEx tracking number', async () => {
		const res = await app.request('http://localhost/123456789012');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.fedex.com/fedextrack/?tracknumbers=123456789012');
	});

	it('Amazon tracking number', async () => {
		const res = await app.request('http://localhost/TBA123456789012');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://track.amazon.com/tracking/TBA123456789012');
	});

	it('DHL tracking number', async () => {
		const res = await app.request('http://localhost/1234567890');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.dhl.com/us-en/home/tracking/tracking-ecommerce.html?submit=1&tracking-id=1234567890');
	});

	it('Non-tracking number should redirect to disambiguation page', async () => {
		const res = await app.request('http://localhost/hello world');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('http://localhost/disambiguate.html?q=hello+world');
	});
});

describe('Bug fixes', () => {
	it('Query with percent sign should not cause internal server error', async () => {
		const res = await app.request('http://localhost/search?q=test%20query');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('http://localhost/disambiguate.html?q=test+query');
	});

	it('Query with lone percent sign should not cause internal server error', async () => {
		const res = await app.request('http://localhost/search?q=%');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('http://localhost/disambiguate.html?q=%25');
	});

	it('Query with malformed percent encoding should not cause internal server error', async () => {
		const res = await app.request('http://localhost/search?q=%2');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('http://localhost/disambiguate.html?q=%252');
	});

	it('Query with multiple percent signs should not cause internal server error', async () => {
		const res = await app.request('http://localhost/search?q=%%test%%');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('http://localhost/disambiguate.html?q=%25%25test%25%25');
	});

	it('Google search with percent sign should extract search term correctly', async () => {
		const res = await app.request('http://localhost/search?q=g%20asdf%25');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/search?q=asdf%25');
	});

	it('Google search with malformed percent in search term should work', async () => {
		const res = await app.request('http://localhost/search?q=g%20test%2');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/search?q=test%252');
	});

	it('Wikipedia search with percent sign should extract search term correctly', async () => {
		const res = await app.request('http://localhost/search?q=w%20python%25');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://en.wikipedia.org/w/index.php?search=python%25');
	});

	it('Google search with plus-encoded spaces should work correctly', async () => {
		const res = await app.request('http://localhost/search?q=g+asdf%25');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/search?q=asdf%25');
	});
});

describe('Disambiguation', () => {
	it('Unknown query should redirect to disambiguation page', async () => {
		const res = await app.request('http://localhost/search?q=unknown+query');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('http://localhost/disambiguate.html?q=unknown+query');
	});

	it('Query from disambiguation page with prefix should work', async () => {
		const res = await app.request('http://localhost/search?q=yt+cats');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.youtube.com/results?search_query=cats');
	});

	it('Empty prefix from disambiguation should default to Google', async () => {
		// This simulates what happens when no prefix is entered on disambiguation page
		const res = await app.request('http://localhost/search?q=g+test+query');
		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toEqual('https://www.google.com/search?q=test+query');
	});
});
