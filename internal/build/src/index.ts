import { Command } from "commander";
import execa from "execa";
import { build } from "vite";
import viteConfig from "./engine/vite.config";

const program = new Command("build");
program.version("0.0.1", "-v, --version").description("查看当前版本号");
program.helpOption("-h --help", "显示帮助信息");
program.usage("<token>");
program.showHelpAfterError("( build -h 查看帮助信息)");

program
  .argument("<detail>")
  .description("查看详情")
  .action((token: string) => {
    console.log(token);
  });

program
  .command("run")
  .argument("<moduleName>")
  .description("aa")
  .action((moduleName: string) => {
    build(viteConfig);
  });


program.parse(process.argv);
