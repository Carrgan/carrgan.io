---
slug: code-beat-first-mvp
title: Code beat first MVP
authors: carrgan
tags: [Front end, Code beat]
---

最近，正在构思一个游戏*Code beat*，一个音乐游戏，讲述程序员升职的故事。游戏需要根据音乐节奏来写代码，从而实现程序员升职。打算把之后每个重要的历史版本托管在[Code beat](/codeBeatLive/)，

每一段代码中，每一个字符都必须在节奏上敲出来，如果早了晚了都会扣分。扣分之后程序会出现bug，可能在后面的关卡中要回头来解决bug。

如果bug太多，程序就直接不能运行，报错提示闯关失败。

在写代码的时候，有一些类似 IDE 快捷键的功能，可以通过.var来快速初始化变量 etc...

游戏提供不同的难度选择

- Level 1: 用户只需要输入对应的字符，不需要在意大小写和特殊字符
- Level 2: 大小写敏感
- Level 3: 需要输入特殊字符

有了构思之后，用Phaser 3，搭建了一个脚手架，虽然使用rollup打包的部分还需要做一些优化，好在花了一天时间写出了一个 MVP（Minimum Viable Product)，[这里有个在线预览](/codeBeatLive/firstMVP/index.html)，包含一些核心功能。


