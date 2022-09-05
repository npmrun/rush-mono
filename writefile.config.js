module.exports = {
    filelist:[
      //字段都可用于模板变量
      {
        use: true,  // 是否启用这个生成模板
        useDir: true, // 是否启用文件夹生成模板,可使用fromDir__
        force: true,  // 是否启用强制覆盖本地文件
        name: "mask",
        var: "mask",
        fromDir__Dir: "./template/component", // 文件夹模板
        toDir__Dir: "./packages/mask",  // 文件夹模板生成路径
      }
    ]
  }