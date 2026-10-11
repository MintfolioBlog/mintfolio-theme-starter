---
title: "排版样张：长段落、代码、表格和图片"
description: "用于观察正文样式和手机阅读体验的 Markdown 示例。"
pubDate: 2026-09-02
category: "主题开发"
tags: ["排版", "Starter"]
authors: ["leaf"]
---

## 正文和强调

一篇文章的排版，应该让读者能够分辨章节、扫读段落，并轻松找到链接。这里有 **加粗内容**、*强调文字*、~~已作废的内容~~ 和一个 [站内链接](/reading-list)。

长链接也应该在手机上正确换行：https://example.com/a/very-long-documentation-path/with-many-sections/and-a-long-example-resource-name

### 列表

- 普通列表项。
- 包含一小段解释的列表项，用于观察文字换行后的对齐和行距。
- 包含行内代码的列表项，例如 theme.settings.accentColor。

## 代码块

~~~ts
export function greet(name: string): string {
  return '你好，' + name;
}

// 这是一行刻意写得较长的代码，用于观察局部横向滚动，而不是让整个页面变宽。
const example = 'a-long-value-for-previewing-horizontal-code-scrolling-on-a-small-mobile-screen';
~~~

## 表格

| 页面 | 数据来源 | 修改入口 | 说明 |
| --- | --- | --- | --- |
| 首页 | theme 与 page.posts | src/pages/home.astro | 摘要与最新文章 |
| 文章 | page.post 与 page.body | src/pages/post.astro | 公开正文或密码解锁 |
| 归档 | page.posts 与 page.pagination | src/pages/archive.astro | 搜索、分类、标签与分页 |
| 独立页面 | page.body 或 page.profile | src/pages/page.astro | Markdown 页面与关于页 |

## 图片与引用

![本地绘制的笔记卡片示意图](/demo-cover.svg)

> 引用区应与普通正文有所区分。
>
> 示例使用的表格滚动容器由 Core 提供，不应该在外面再套一层横向滚动区域。

---

最后一个段落用于检查段落与分隔线的间距。
