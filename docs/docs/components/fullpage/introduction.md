
# 介绍

这是一个全局滚动的组件，使用原生开发，类似于一个竖着的swiper，兼容电脑，平板与手机。

## 安装

```
npm i @noderun/fullpage
```

## 用法

```html
<script type="module">
    import FullPage from "../dist/fullpage.es.mjs"
    new FullPage({
        el: ".wrap",
        callback: function (current, last) {
            console.log(current, last);
            if (current == 0) {
                document.querySelector("div.block.red > div").classList.add("active")
            }else{
                document.querySelector("div.block.red > div").classList.remove("active")
            }
        }
    });
</script>
```