import { Command } from "commander";
import execa from "execa";
import { build as viteBuild, createServer } from "vite";
import { build as unbuildBuild } from "unbuild";
import viteVue3ComponentEngine from "./engine/vite.vue3.component";
import unbuildEngine from "./engine/unbuild";

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
  .argument("<engine>")
  .description("运行何种引擎进行全自动打包")
  .action((engine: string) => {
    const env = "production"

    if (engine === "vite") {
        viteBuild(viteVue3ComponentEngine(env));
    }

    if (engine === "unbuild") {
        unbuildBuild(...unbuildEngine(env));
    }
  });

program
  .command("dev")
  .argument("<engine>")
  .description("启动库开发模式")
  .action(async (engine: string) => {
    const env = "development"

    if (engine === "vite") {
        const server = await createServer({
            ...viteVue3ComponentEngine(env),
            logLevel: "info",
            mode: env,
            server:{
                port: 3214,
                open: true
            },
        });
        await server.listen()
        server.printUrls()
    }

    if (engine === "unbuild") {
        const en = unbuildEngine(env)
        en[1] = true
        unbuildBuild(...en);
    }
  });

program.parse(process.argv);
