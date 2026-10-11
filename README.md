# Mintfolio Theme Starter

带完整内容示例的独立 Mintfolio Astro 主题模板，面向 Core 0.4.1+ / Theme API 1.3。
提供首页、文章、归档、普通页面四个渲染器；404 故意留给 Core 的 Minimal 兜底，展示可选页面的组合方式。

## 先运行带内容的示例

仓库自带 [完整演示站点](examples/demo/README.md)：6 篇可见文章、1 篇草稿、一个两篇系列、密码文章、排版样张、独立页面，以及示例作者/项目。归档每页三篇，方便观察分页。

~~~sh
npm ci
npm run demo:setup
npm run demo
~~~

访问 http://127.0.0.1:4370/。公开示例密码是 starter-demo。修改示例内容可立即观察；修改主题源码后重新运行 demo:setup，再启动预览。
这些命令只操作 examples/demo，不会修改你的私人博客。示例内容不打进主题 npm 包。

## 模板包含什么

- 共享布局使用 theme/page 公开 props、站点导航、SEO、favicon、订阅链接和备案号。
- 首页显示安全文章摘要、Core 的文章元信息和空列表状态。
- 文章页展示分类、标签、封面、可折叠目录；密码正文使用 Core ProtectedArticle。
- ArticleLinks 复用 Core 的上一篇/下一篇、系列与相关文章。
- 归档复用 PostArchive 的搜索、分类/标签和静态分页，另展示 Core 提供的系列入口。
- 普通页支持 Markdown 正文、草稿预览标记和内置关于页资料；空邮箱与空项目不显示占位内容。
- 手机布局允许长文字换行，正文表格/代码局部滚动，导航和按钮保留触控尺寸。
- 不带 React、Tailwind 或客户端路由，作为简单可改的起点。

统计由 Core 的生产 HTML 中间件接入。不要在主题中复制 gtag.js 或自行发送 page_view。

## 开始自己的主题

使用 GitHub 的 Use this template，或克隆本仓库，然后 npm ci。
先调整 package.json 的包名、作者、仓库信息，以及 theme.mjs 的 id、name、version。

| 文件 | 作用 |
| --- | --- |
| theme.mjs | 页面、能力和设置 schema |
| src/settings.ts | 页面共用的设置类型 |
| src/config/theme-starter.config.mjs | 带注释的设置模板，由 Core 写入站点主题配置 |
| src/layouts/StarterLayout.astro | 文档、导航、SEO 和页脚 |
| src/pages/ | 四种页面渲染器 |
| src/styles/theme.css | 统一布局与正文样式 |

增加设置时同步修改 schema、共享类型与设置模板。package.json 的 mintfolio.configTemplate 必须指向打包包含的文件；设置模板只导出配置对象，不读取宿主文件。
重命名包或主题 id 时，也更新设置模板路径、exports 和 mintfolio.configTemplate。

## 放进当前结构的站点预览

主题仓库与博客站点是两个独立项目：

~~~text
my-theme/                 主题源码
my-blog/
  hello.md                博客文章
  _mintfolio/
    package.json          Core 和主题依赖
    site.config.ts        资料、导航、统计、favicon
    theme.config.mjs       theme 与带注释的 settings
    pages/                独立 Markdown 页面
    public/               站点静态资源
~~~

先完成全部改动，再按项目要求检查，随后打包：

~~~sh
npm run check
npm pack --ignore-scripts
~~~

这里显式检查一次，再跳过 prepack 自动重复检查。需要暂时只打包源码时可单独执行 npm pack --ignore-scripts，但不要把未检查的包描述为已验证。

使用生成的实际 tgz 文件名，不要照抄旧版本号。把包复制到测试站点的 _mintfolio 目录，在该目录运行：

~~~sh
npm install ./theme-mintfolio-starter-0.4.1.tgz
npx mintfolio theme use theme-mintfolio-starter
npx mintfolio dev
~~~

已改过包名或版本时替换相应参数。Core 的交互菜单也能安装和切换主题。
主题仓库自身的 astro.config.mjs 只用于源码检查，不是一个可浏览的博客；需要在消费该主题的站点里预览。

切换主题后配置类似：

~~~js
export default {
  theme: 'theme-mintfolio-starter',
  settings: {
    accentColor: '#2255aa',
    showToc: true,
  },
};
~~~

Core 0.4 使用 _mintfolio/theme.config.mjs 的内联 settings，不再要求维护独立 theme-starter.config.mjs。模板文件仍在主题包中，用于生成带说明的设置。

## 公开接口边界

页面只从 Astro.props 获取 theme/page：
- 页面链接使用 Core 提供的 post.url、term.url、theme.urls 或 theme.navigation，适配部署子目录。
- 元信息使用 PostMeta；站点时区通过 theme.site.blog.timezone 传入。
- page.body.kind === 'public' 时才使用 html/headings；密码、密文解密及解锁后的 DOM 生命周期由 Core 负责。
- 标题和目录文字使用 Astro 的正常转义，不使用 set:html。只有 Core 已处理的正文 HTML 使用 set:html。
- 不导入 astro:content、宿主 site.config.ts 或 Core 私有 server/engine 路径。
- manifest.engine 的 ^1.3.0 是 Theme API 契约范围，不是 Core 包版本。
- 未声明的可选页面由 Core 兜底；若要定制 404，在 pages 中增加 notFound。

## 站点 favicon 与统计

favicon 属于 _mintfolio/site.config.ts 的 site.favicon。把图标放入 _mintfolio/public，例如 favicon.ico，配置为 '/favicon.ico'。
SeoHead 接收 page.seo 和主题 markerUrl 兜底；站点自定义图标替换整组默认图标，子目录前缀由 Core 处理。

Google Analytics 配置放在同一站点配置的 analytics.google.measurementId，主题无需任何统计代码。生产注入和避免重复初始化由 Core 负责。

## 依赖和交付

当前模板版本为 0.4.1，兼容 Core ^0.4.1、Astro ^7.3.2 和 Theme API ^1.3.0。
仓库 lockfile 中的 vendor 包用于独立安装开发依赖；发布包不包含 node_modules、vendor、宿主内容或私有配置。
修改后的源代码需重新打包安装，刷新页面不会自动更新已安装的 npm 包。

本次更新已通过 Astro/TypeScript 检查、demo:setup 和 demo:build；演示站点生成 24 个页面。已查看 1440px 桌面首页与 390px 排版页面，未发现横向溢出或图片加载失败，密码文章解锁正常且浏览器无脚本错误。未发布 npm 新版。

[主题开发教程](https://github.com/MintfolioBlog/mintfolio/wiki/Theme-Development) · [API 参考](https://github.com/MintfolioBlog/mintfolio/blob/main/docs/theme-api.md)

## 许可证

GPL-3.0-only，保留许可证与来源说明。
