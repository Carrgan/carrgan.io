---
slug: dynamic-height-container
title: CSS自适应固定长款比容器
authors: carrgan
tags: [Front end, CSS]
---

# CSS实现自适应长款比的容器

## Padding

实现自适应长款比的关键就是padding，在设置padding的时候使用 `%` 计算的值是根据宽度计算的，

也就是说 `padding: 50%` 其实是基于容器宽度的50%。

## 容器实现

根据padding的这一特性实现这一容器就很简单了

```html title="16/9占满屏幕的容器"
<div class="container">
  <div class="content"></div>
</div>
```

```css title="16/9占满屏幕的容器"
.container {
    width: 100%;
    padding-bottom: 56.25%
}
.content {
    width: 100%;
    height: 100%;
}
```

同理可对一个容器实现一个遮罩层

```html title="16/9占满屏幕的背景和一个悬浮居中的图标"
<div class="container">
  <div class="background"></div>
  <div class="content">
    <svg width="35px" height="35px"></svg>
  </div>
</div>
```

```css title="16/9占满屏幕的背景和一个悬浮居中的图标"
.container {
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
    top: 0;
    left: 0;
}
.background {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.content {
    width: 100%;
    position: absolute;
    top: calc(50% - 35px);
    left: calc(50% - 35px);
    z-index: 2;
}
```