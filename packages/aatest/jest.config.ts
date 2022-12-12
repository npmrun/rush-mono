import Config from "@internal/build/jest.config"
import { JestConfig } from "@internal/build"

export default {
    ...Config,
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
} as JestConfig