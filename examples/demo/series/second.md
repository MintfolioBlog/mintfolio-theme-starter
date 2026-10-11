---
title: "主题开发手记（二）：用公开数据组合页面"
description: "系列示例的第二篇，说明页面只依赖公开 props 的做法。"
pubDate: 2026-09-04
category: "主题开发"
tags: ["Starter", "Astro"]
series: "主题开发手记"
seriesOrder: 2
authors: ["leaf"]
---

## 页面收到什么

每个渲染器接收 theme 与 page。theme 提供站点资料、主题设置和内容查询；page 提供当前页面需要的数据。

## 空状态也是界面的一部分

没有文章时显示说明；没有邮箱时不创建空的 mailto 链接；密码正文不提前出现在 HTML 中。

## 保持主题边界

不要从主题读取站点文章目录。需要更多文章时使用公开内容 API，需要跳转时使用 Core 已提供的 URL。
