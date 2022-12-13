import { defineConfig } from "windicss/helpers"
import type { FullConfig } from "windicss/types/interfaces"
export * from "@testing-library/vue"
import type { Config } from "jest"

export {
    defineConfig,
    FullConfig,
    Config as JestConfig
}