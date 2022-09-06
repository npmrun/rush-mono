import execa from "execa";
import fs from "fs-extra";
import chalk from "chalk";

(async function() {
  console.log(chalk.red("正在清理dist文件夹"));
  await fs.remove(`dist`);
  console.log(chalk.red("清理完成，开始构建"));
  await execa(
    "rollup",
    [
      "--config",
      "./scripts/rollup.config.ts",
      "--configPlugin",
      "rollup-plugin-typescript2",
      "--environment",
      `NODE_ENV:production`,
    ],
    {
      stdio: "inherit",
    }
  );
  console.log(chalk.red("构建完成"));
  console.log(chalk.green("全部构建完毕"));
})();
