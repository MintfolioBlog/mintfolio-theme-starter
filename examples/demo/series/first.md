---
title: "主题开发手记（一）：从颜色和字体开始"
description: "系列示例的第一篇，展示 series 与 seriesOrder 的用法。"
pubDate: 2026-09-03
category: "主题开发"
tags: ["Starter", "设计"]
series: "主题开发手记"
seriesOrder: 1
authors: ["leaf"]
---

## 先调整强调色

演示站点通过主题配置把链接颜色设为绿色。你可以修改 _mintfolio/theme.config.mjs 中的 accentColor，观察导航、正文链接和键盘焦点的变化。

## 再调整阅读宽度

正文不必占满桌面屏幕。可以在 src/styles/theme.css 中调整 .shell 的最大宽度。

下一篇继续讨论页面数据与可选区块。页面下方的系列目录由 Core 的 ArticleLinks 提供。
