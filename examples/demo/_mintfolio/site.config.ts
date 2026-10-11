import { defineSiteConfig } from '@mintfolio/core/config';

// Fictional demo identity. Never copy these values into a real user's site.
export default defineSiteConfig({
  site: {
    title: 'Starter 的小小笔记本',
    description: '一套有真实内容结构的主题示例：读文章、翻归档、查看系列，也试试密码文章。',
    url: 'https://example.com',
    language: 'zh-CN',
    favicon: '/demo-mark.svg',
  },
  profile: {
    name: '小叶（示例作者）',
    avatar: '/demo-mark.svg',
    bio: '这是主题模板中的虚构作者，用于展示头像、简介、项目和联系方式。',
    location: '示例城市',
    signature: '从一个小例子开始，把它改成自己的样子。',
  },
  contact: { email: 'hello@example.com', social: ['github'] },
  social: [{ platform: 'github', url: 'https://github.com/MintfolioBlog', icon: 'github' }],
  projects: [
    { title: '阅读笔记（示例）', description: '用短文章记录一次学习过程。', link: '/reading-list', tags: ['写作', '阅读'] },
    { title: '主题实验室（示例）', description: '修改颜色、排版和文章布局，观察同一批内容的变化。', repo: 'https://github.com/MintfolioBlog/mintfolio-theme-starter', tags: ['Astro', '主题'] },
  ],
  blog: { pageSize: 3, timezone: 'Asia/Shanghai' },
  authors: [
    { id: 'leaf', name: '小叶', url: 'https://example.com/about' },
    { id: 'reader', name: '读者朋友', url: 'https://example.com/reading-list' },
  ],
  navigation: [
    { id: 'home', label: '首页', url: '/' },
    { id: 'archive', label: '文章', url: '/blog' },
    { id: 'about', label: '关于', url: '/about' },
    { id: 'reading', label: '阅读清单', url: '/reading-list' },
  ],
  // Analytics intentionally omitted: viewing a template should not send traffic.
});
