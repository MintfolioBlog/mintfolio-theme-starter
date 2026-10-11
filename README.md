# Mintfolio Theme Starter

从小型 Astro 主题开始，写一个自己的 [Mintfolio](https://github.com/MintfolioBlog/mintfolio) 主题。

这个仓库提供首页、文章、归档、普通页面、布局和少量样式。未实现的 404 由 Core 补齐，密码文章直接使用 Core 的解锁组件。你可以先调整颜色和排版，再逐个替换页面。

## 开始修改

点击 GitHub 的 **Use this template**，或者克隆：

~~~sh
git clone https://github.com/MintfolioBlog/mintfolio-theme-starter.git my-theme
cd my-theme
npm ci
~~~

先改这些文件：

| 文件 | 修改内容 |
| --- | --- |
| package.json | 自己的包名、作者和仓库地址；如设置了 private，发布前移除 |
| theme.mjs | id、显示名称、版本、页面与设置项 |
| src/layouts/StarterLayout.astro | 页面框架、SEO 与导航 |
| src/pages/home.astro | 首页 |
| src/pages/post.astro | 公开正文与密码文章 |
| src/styles | 排版与样式 |

## 放进站点里看

在主题目录运行：

~~~sh
npm run check
npm pack
~~~

把生成的 tgz 放进已安装 Mintfolio 的测试站点，在站点目录运行：

~~~sh
npm install ./theme-mintfolio-starter-0.3.0.tgz
mintfolio theme use theme-mintfolio-starter
mintfolio dev
~~~

如果已经改过包名，命令也换成新名称。修改主题后重新打包安装，发布新版本时增加版本号。

## 写页面时记住

页面从 Astro.props 取得 theme 和 page。文章链接使用 post.url，导航使用 theme.urls。公开正文在 page.body.html，密码文章交给 ProtectedArticle 组件。主题不读取 content/blog、site.config.ts 或 astro:content。

可声明的页面为 home、post、archive、page、notFound，前两个必需。manifest.engine 的 ^1.0.0 对应主题契约，不是 Core 包版本。

[主题开发教程](https://github.com/MintfolioBlog/mintfolio/wiki/Theme-Development) 按顺序介绍设置、页面、搜索、打包与调试。[API 参考](https://github.com/MintfolioBlog/mintfolio/blob/main/docs/theme-api.md) 提供完整字段和行为说明。

## 许可证

[GPL-3.0-only](LICENSE)。保留许可证与来源说明，引入第三方素材时一并记录许可。

## 0.3.0 发行

主题包与 manifest 统一为 0.3.0，依赖 Mintfolio Core ^0.3.0。可使用 npm install theme-mintfolio-starter@0.3.0 安装，随后使用 mintfolio theme use theme-mintfolio-starter 切换。


0.4.0：主题包与 manifest 版本同步为 0.4.0，支持 Core 0.4。
