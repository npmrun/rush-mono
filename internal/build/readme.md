## 打包模式

字段buildinfo

-   `vite` + `components`  
组件库打包
```
{
    "engine": "vite", // Vite打包
    "mode": "components", // 组件库打包
    "componentsName": "components", // outDir基准下的assetFileNames文件输出目录
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
    "engine": "rollup",
    "mode": "cli",
    "name": "cloud", // 文件名
    "outDir": "./dist", // 输出位置
    "entry": "./src/index.ts" // 入口文件
}
```

-   `vite` + `component`  
单个组件打包,提供watch命令监听文件变化打包

```
{
    "engine": "vite",
    "mode": "component",
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
    "engine": "rollup",
    "mode": "test",
    "outDir": "./dist", // 输出位置
    "entry": [
        "./src/a.ts",
        "./src/b.ts",
    ]
}
```

-`unbuild` 
构建库

```
{
    "engine": "unbuild",
    "filename": "my-lib",
    "varname": "myLib",
    "outDir": "./dist",
    "entry": "./src/index.ts"
}
```

-`rollup` + `module`
构建库
{
    "engine": "rollup",
    "mode": "module",
    "filename": "fullpage",
    "varname": "FullPage",
    "outDir": "./dist",
    "entry": "./src/main.ts",
    "watch": "es",
    "format": ["es" , "umd" , "cjs"]
  }