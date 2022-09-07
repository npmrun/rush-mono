import { Command } from 'commander'
import { build as viteBuild, dev as viteDev } from './engine/vite'
import { build as rollupBuild, dev as rollupDev } from './engine/rollup'
import unbuildBuild from './engine/unbuild'
import { buildInfo } from '@/parse'

const program = new Command('build')
program.version('0.0.1', '-v, --version').description('查看当前版本号')
program.helpOption('-h --help', '显示帮助信息')
program.usage('<token>')
program.showHelpAfterError('( build -h 查看帮助信息)')

program
    .argument('<detail>')
    .description('查看详情')
    .action((token: string) => {
        console.log(token)
    })

program
    .command('build')
    .description('开始构建')
    .action(() => {
        const engine = buildInfo.engine
        if (engine === 'vite') {
            viteBuild()
        }
        if (engine === 'cli') {
            rollupBuild()
        }
        if (engine === 'unbuild') {
            unbuildBuild(false)
        }
    })

program
    .command('dev')
    .description('启动库开发模式')
    .action(async () => {
        const engine = buildInfo.engine
        if (engine === 'vite') {
            await viteDev()
        }
        if (engine === 'cli') {
            await rollupDev()
        }
        if (engine === 'unbuild') {
            unbuildBuild(true)
        }
    })

program.parse(process.argv)
