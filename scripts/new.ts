import inquirer, { QuestionCollection } from "inquirer";
import writefile from "./_writefile";

const defaultQuestion: Record<"ui" | "cli", QuestionCollection<any>> = {
    "cli": [

    ],
    "ui": [
        {
            type: 'input',
            name: 'uiName',
            message: "请输入生成的文件夹名称",
            validate(input) {
                if (!input) {
                    return '请提供一个名字'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'fileName',
            message: "请输入输出后的文件名称",
            validate(input) {
                if (!input) {
                    return '请提供一个名字'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'globalName',
            message: "请输入定义的全局变量名",
            validate(input) {
                if (!input) {
                    return '请提供一个名字'
                }
                return true
            }
        },
    ]
}

    ; (async () => {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: "temp",
                message: "请选择一个模板生成",
                choices: [
                    { name: "命令行", value: "cli" },
                    { name: "组件", value: "ui" },
                ],
                default: 'ui',
            },
            ...((defaultQuestion["ui"] as any[]).map(v => {
                v.when = (answers: any) => answers['temp'] === 'ui'
                return v
            })),
            ...((defaultQuestion["cli"] as any[]).map(v => {
                v.when = (answers: any) => answers['temp'] === 'cli'
                return v
            })),
        ])
        if (answers.temp === 'ui') {
            writefile("template/ui", `packages/ui/${answers.uiName}`, answers, false)
        }
    })()