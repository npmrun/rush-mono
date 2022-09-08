---
layout: home

hero:
    name: Rush-Mono
    text: 构建一切，享受生活
    tagline: 集合管理库，懒得每次都得新建一个项目
    image:
        src: /logo.jpg
        alt: VitePress
    actions:
        - theme: brand
          text: 开始
          link: /guide/introduction
        - theme: alt
          text: 查看GitHub
          link: https://github.com/vuejs/vitepress
features:
    - icon: ⚡️
      title: 由VitePress提供支持
      details: 快！
    - icon: 🖖
      title: 由Vue集成Markdown提供支持
      details: 美！
    - icon: 🛠️
      title: 每一个都极简却都不简单
      details: 简！
---

<style>
    .VPFeatures.VPHomeFeatures .items .item{
        width: 100%;
        
    }
    @media (min-width: 640px){
        .VPFeatures.VPHomeFeatures .items .item{
            width: calc(100% / 2);
        }
    }
    @media (min-width: 768px){
        .VPFeatures.VPHomeFeatures .items .item{
            width: calc(100% / 3);
        }
    }
    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
    }
</style>
