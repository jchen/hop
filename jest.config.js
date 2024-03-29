module.exports = {
	testEnvironment: 'miniflare',
	testMatch: ['**/test/**/*.+(ts|tsx)', '**/src/**/(*.)+(spec|test).+(ts|tsx)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'esbuild-jest',
	},
	moduleNameMapper: {
		__STATIC_CONTENT_MANIFEST: '<rootDir>/manifest.ts',
	},
};
