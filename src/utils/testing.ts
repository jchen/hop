import { Env, Hono } from 'hono';

export async function expectRedirect(app: Hono<Env, {}, ''>, query: string, expected: string) {
	const pathRes = await app.request(`http://localhost/${query}`);
	expect(pathRes.status).toBe(302);
	expect(pathRes.headers.get('location')).toEqual(expected);
	const queryRes = await app.request(`http://localhost/search?q=${query}`);
	expect(queryRes.status).toBe(302);
	expect(queryRes.headers.get('location')).toEqual(expected);
}
