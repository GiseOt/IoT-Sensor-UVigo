module.exports = {
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.jest.json",
			isolatedModules: true,
		},
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	moduleNameMapper: {
		"\\.(css|scss|sass)$": "identity-obj-proxy",
	},
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	testMatch: ["**/__tests__/**/*.test.ts?(x)"],
};
