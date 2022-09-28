## 打包模式

-   `vite` + `components`  
组件库打包
```
{
    "engine": "vite", // Vite打包
    "mode": "components", // 组件库打包
    "componentsDir": "./src/components", // 组件相对位置
    "componentsOutDir": "./dist/components", // 组件库输出位置
    "componentsPrefix": "cloud", // 组件库前缀
    "componentsPkgPrefix": "cloud-ui/dist/components", // 组件库extrals路径前缀
    "fileName": "cloud-ui", // 全量打包输出文件名
    "name": "cloud", // 全量打包变量名
    "outDir": "./dist", // 输出位置
    "entry": "./src/index.ts" // 全量打包入口文件
}
```

-   `rollup` + `cli`  
命令行打包

```
{
    "name": "cloud", // 文件名
    "outDir": "./dist", // 输出位置
    "entry": "./src/index.ts" // 入口文件
}
```

-   `vite` + `component`  
单个组件打包

```
{
    "fileName": "mask", // 输出文件名
    "name": "cloud", // 变量名
    "outDir": "./dist", // 输出位置
    "entry": "./src/index.ts" // 入口文件
}
```

-   `rollup` + `test`  
测试多个文件打包

```
{
    "outDir": "./dist", // 输出位置
    "entry": [
        "./src/a.ts",
        "./src/b.ts",
    ]
}
```