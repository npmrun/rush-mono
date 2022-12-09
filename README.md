## Rush-Mono

`turborepo` + `changeset` + `pnpm workspace`

采用内部命令行工具解耦，不同的包可使用不同的打包库，主要目的就是不用每次都建一个库，把自己开发工具放一起，简便又可控

使用`pnpm publish`发布

pnpm dev:ui --repo=adjust-line

pnpm dev --repo=feather-ui

<!-- "^watch": "同时运行子依赖的话会导致dev已经完成了，而watch还没编译完，导致dev时获取不到模块而报错。", -->