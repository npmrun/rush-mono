---
layout: home

hero:
    name: PrincessUI
    text: Build better interfaces faster.
    tagline: Beautiful vue3 component library
    image:
        src: /logo.jpg
        alt: VitePress
    actions:
        - theme: brand
          text: Get Started
          link: /guide/introduction
        - theme: alt
          text: View on GitHub
          link: https://github.com/vuejs/vitepress
features:
    - icon: ⚡️
      title: Vite, The DX that can't be beat
      details: Lorem ipsum...
    - icon: 🖖
      title: Power of Vue meets Markdown
      details: Lorem ipsum...
    - icon: 🛠️
      title: Simple and minimal, always
      details: Lorem ipsum...
    - icon: 🛠️
      title: Simple and minimal, always
      details: Lorem ipsum...
    - icon: 🛠️
      title: Simple and minimal, always
      details: Lorem ipsum...
    - icon: 🛠️
      title: Simple and minimal, always
      details: Lorem ipsum...
    - icon: 🛠️
      title: Simple and minimal, always
      details: Lorem ipsum...
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
