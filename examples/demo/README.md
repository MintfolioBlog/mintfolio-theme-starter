# Starter 演示站点

这是一套可阅读、可修改的示例内容，不是测试套件，也不会自动写进 PersonalSite。

## 启动

在主题仓库根目录执行：

~~~sh
npm ci
npm run demo:setup
npm run demo
~~~

打开 http://127.0.0.1:4370/。setup 会打包当前主题源码，再通过 npm 安装到此演示站点。
不直接链接整个主题源码目录，避免把主题开发依赖误识别成主题私有模块。
打包使用 --ignore-scripts，不自动触发检查；需集中检查时另行运行 npm run check。

修改文章或演示配置后保存即可。修改主题 src/ 或 theme.mjs 后，先停止服务，重新运行 demo:setup，再运行 demo。
结束预览时用 Ctrl+C 停止自己的演示进程。

可选：npm run demo:build 构建正式产物，npm run demo:preview 查看产物。这两个命令不会自动运行测试。

如果重命名主题包，请同时更新 _mintfolio/theme.config.mjs 的 theme 字段。setup 会自动读取 npm pack 返回的真实文件名，不需要手改 tgz 版本。

## 可以直接观察的例子

| 内容 | 源文件 | 页面或入口 |
| --- | --- | --- |
| 置顶、封面、多作者、更新时间 | welcome.md | /blog/welcome |
| 长文本、代码、表格、图片、目录 | typography.md | /blog/typography |
| 两篇连续系列 | series/first.md、series/second.md | 点击文章底部系列目录 |
| 密码解锁与重新锁定 | protected.md | /blog/protected |
| 短文、无封面、另一位作者 | short-note.md | /blog/short-note |
| 草稿排除 | draft.md | 普通预览和生产构建不显示 |
| 独立 Markdown 页面 | _mintfolio/pages/reading-list.md | /reading-list |
| 资料、邮箱、社交和两个项目 | _mintfolio/site.config.ts | /about |
| 每页三篇、搜索、分类、标签 | 由 Core 生成 | /blog |
| Core 兜底 404 | 无需主题文件 | 访问一个不存在的路径 |

公开示例密码为 **starter-demo**，不是真实秘密；项目源码本身包含该密码及示例正文。
草稿只在显式启用 Core 草稿预览时显示。需要这种模式时，在站点目录运行 npx mintfolio dev --drafts。

## 几个建议亲手改的地方

1. **配色**：把 _mintfolio/theme.config.mjs 的 accentColor 改成 '#a23b59'，观察链接、目录和焦点样式。
2. **目录开关**：把 showToc 改成 false，查看排版样张；正文标题仍然保留。
3. **首页**：编辑主题 src/pages/home.astro，在文章标题旁增加一个来自 post.category.label 的分类标记。
4. **空状态**：暂时将示例文章的 draft 设为 true，观察首页和归档空列表；不要修改主题来判断文章是否发布。
5. **可选资料**：把 site.config.ts 中的 contact.email 设为空、projects 设为 []，观察关于页不再出现对应占位内容。
6. **子目录**：如需观察 base，可在 _mintfolio/astro.config.mjs 中仅导出 { base: '/demo' }；不要重复安装 Core integration 或手写内容集合。
7. **新增渲染器**：参照 src/pages/page.astro 新建 not-found.astro，再在 theme.mjs 的 pages.notFound 中注册，替换 Core 的 404。

## 边界与产物

演示站点只通过正式 Core 包和本地主题安装包运行。不要把演示作者资料硬编码进主题，也不要把主题源码复制进 node_modules。
analytics 故意不配置，查看模板不会把流量发到任何人的 Google Analytics。
SVG 图片是仓库内的简单演示图形；不会额外下载字体或图片。

node_modules、.packages、运行缓存和演示 lockfile 均不提交。examples/ 不在主题 npm 发布白名单中，不会随主题安装污染真实站点内容。
已验证 demo:setup、demo:build，以及桌面首页、手机排版和密码文章解锁。修改后可使用上述命令重新验证自己的主题。
