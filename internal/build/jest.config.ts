import { Config } from "jest"

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: __dirname,
    transform: {
        '\\.(vue)$': '<rootDir>/node_modules/@vue/vue3-jest', // vue 文件用 vue-jest 转换
        '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest', // ts 文件用 ts-jest 转换
        "\\.(js|jsx)$": '<rootDir>/node_modules/babel-jest'
    },
    displayName: {
        name: 'CLIENT',
        color: 'blue',
      },
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleNameMapper: {
        // https://github.com/vuejs/vue-jest/issues/479
        // https://github.com/vuejs/vue-test-utils/issues/1975
        '^@vue/test-utils$': require.resolve('@vue/test-utils')
    },
} as Config