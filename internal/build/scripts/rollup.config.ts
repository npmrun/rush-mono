import { defineConfig, ModuleFormat } from "rollup";
import pkg from "../package.json";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import exportOutput from "./exportOutput";
import { nodeResolve } from '@rollup/plugin-node-resolve';

let isProd = process.env.NODE_ENV === "production";

let external: string[] = [];

external = [
  ...Object.keys((pkg as any)?.dependencies ?? {}),
  ...Object.keys((pkg as any)?.peerDependencies ?? {}),
];
let globals: Record<string, string> = {};
external.forEach((v) => {
  globals[v] = v;
});

function resolvePath(...argu: string[]) {
  return path.resolve(__dirname, "../", ...argu);
}

const inputPlugins: any[] = [peerDepsExternal()];

export default defineConfig({
  input: resolvePath("src/index.ts"),
  external,
  output: exportOutput(globals),
  plugins: inputPlugins,
});

const tsPlugin = typescript({
  check: isProd,
  tsconfig: resolvePath("tsconfig.json"),
  cacheRoot: resolvePath("node_modules/.rts2_cache"),
  tsconfigOverride: {
    compilerOptions: {
      declaration: isProd,
      declarationDir: "dist",
      sourceMap: isProd,
    },
  },
});

const aliasPlugin = alias({
  // entries: {"@": path.resolve(__dirname, "src")}
});
const replacePlugin = replace({
  preventAssignment: true,
  values: {
    // "__DEV__": `${!isProd}`,
  }
});
// inputPlugins.push(bundleScss({ output: `${pkg.buildOptions.filename}.scss`, exclusive: false }))

inputPlugins.push(nodeResolve());
inputPlugins.push(commonjs());
inputPlugins.push(aliasPlugin);
inputPlugins.push(replacePlugin);
inputPlugins.push(tsPlugin);
