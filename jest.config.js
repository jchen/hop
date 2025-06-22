module.exports = {
	testEnvironment: 'miniflare',
	testMatch: ['**/test/**/*.+(ts|tsx)', '**/src/**/(*.)+(spec|test).+(ts|tsx)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'esbuild-jest',
	},
	moduleNameMapper: {
		__STATIC_CONTENT_MANIFEST: '<rootDir>/manifest.ts',
	},
	testEnvironmentOptions: {
		bindings: {
			__STATIC_CONTENT: {
				get: async (key) => {
					// Mock static content responses
					const mockContent = {
						'static/index.html': '<html><head><title>hop</title></head><body>test</body></html>',
						'static/opensearch.xml': '<?xml version="1.0"?><OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"></OpenSearchDescription>',
						'static/index.css': 'body { margin: 0; }',
						'static/icon.png': 'mock-png-data'
					};
					return mockContent[key] || null;
				}
			},
			ASSETS: {
				fetch: async (request) => {
					const url = new URL(request.url || request);
					const path = url.pathname;
					const mockContent = {
						'/static/index.html': '<html><head><title>hop</title></head><body>test</body></html>',
						'/static/opensearch.xml': '<?xml version="1.0"?><OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"></OpenSearchDescription>',
						'/static/index.css': 'body { margin: 0; }',
						'/static/icon.png': 'mock-png-data'
					};
					const content = mockContent[path];
					if (content) {
						return new Response(content, { status: 200 });
					}
					return new Response('Not Found', { status: 404 });
				}
			},
		},
		kvNamespaces: ['__STATIC_CONTENT'],
	},
};
