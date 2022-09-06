import execa from "execa";
import fs from "fs-extra";
import chalk from "chalk";
import pkg from "../package.json";

console.log(chalk.red("开始监听,格式:" + pkg.buildOptions.watch));
execa(
  "rollup",
  [
    "-wc",
    "./scripts/rollup.config.ts",
    "--configPlugin",
    "rollup-plugin-typescript2",
    "--environment",
    `NODE_ENV:development`,
  ],
  {
    stdio: "inherit",
  }
);
