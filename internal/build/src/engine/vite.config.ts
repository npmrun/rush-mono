import { defineConfig, InlineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import fs from "fs-extra";
import _ from "lodash";
import path from "path";

const pkgInfo = fs.readJSONSync(path.resolve(process.cwd(), "./package.json"));
const buildInfo = pkgInfo.buildinfo ?? {};
const dependencies = pkgInfo["dependencies"] ?? {};
const devDependencies = pkgInfo["devDependencies"] ?? {};
const peerDependencies = pkgInfo["peerDependencies"] ?? {};
const externals = [
  ...Object.keys(dependencies),
  ...Object.keys(devDependencies),
  ...Object.keys(peerDependencies),
];
let globals: Record<string, string> = {};
externals.forEach((v) => {
  globals[v] = v;
});

export default {
  root: process.cwd(),
  logLevel: "error",
  plugins: [vue({ isProduction: true }), vueJsx(), dts()],
  build: {
    outDir: buildInfo.outDir,
    cssCodeSplit: false,
    emptyOutDir: false,
    lib: {
      entry: buildInfo.entry,
      name: buildInfo.name,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: externals,
      output: {
        globals: globals,
      },
    },
  },
} as InlineConfig;
