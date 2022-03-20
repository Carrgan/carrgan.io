---
slug: long-blog-post
title: V2 Post
authors: carrgan
tags: [New Version]
---

距离 carrgan.io V1 已经过去快一年了，一年之前刚刚从学校出来，还没有参加工作，利用闲暇时光发布了V1。

![v1](./V1.png)

V1用[Pmndrs](https://docs.pmnd.rs/)为React封装的[Three.js](https://threejs.org/)加载了一个在开源社区[Sketchfab](https://sketchfab.com/feed)找的，免费使用的3D模型。

由于网站托管在github，有一些网络和性能原因，还有这个模型不是我自己建的，感觉有很多限制，我想实现的很多细节功能（点击一个3D物体，触发指定的事件）不能被实现，所以放弃了这一版。

本来想要自己用[Blender](https://www.blender.org/)自己建一个3D模型，可是这个软件实在是过于复杂，不值得为了这个投入大量时间去学习。

最后使用[Sketch](https://www.sketch.com)画了一颗星球来作为Logo和主页。

在开发V2的时候遇到了一些问题，一开始写好之后发现Safari的图形处理性能很低，由于SVG加了一些阴影和光影效果导致了渲染的卡顿，迫不得之下只能让Safari不渲染阴影和光影。

之后使用`@keyframe`写了动画放在全局的CSS文件中，结果Docusaurus打包的时候不能正确的将`@keyframe`写入打包好的CSS文件，由于Docusaurus使用了[SSG](https://www.docusaurus.io/zh-CN/docs/advanced/ssg)渲染，想要手动的把CSS导入很麻烦，只能打包好再手动写入`index.html`。

最后决定选用JS动画库，在比较了多款JS库之后，选择了[AnimeJS](https://animejs.com)非常强大的JS库，同样使用了React的封装版[react-anime](https://github.com/plus1tv/react-anime/blob/HEAD/documentation.md).

**在V2.1版本中打算处理星星和星球的点击事件**


