import { defineTheme } from '@mintfolio/core/theme';

/**
 * Small package-ready example. A real theme can add optional renderers and
 * settings while continuing to consume only the public Mintfolio SDK.
 */
export default defineTheme({
  manifest: {
    id: 'starter',
    name: 'Starter',
    version: '0.4.1',
    author: 'Mintfolio contributors',
    description: '用于创建独立 Mintfolio 主题的最小示例。',
    engine: '^1.3.0',
  },
  capabilities: {
    encryptedPosts: true,
    search: true,
    tags: true,
    categories: true,
  },
  pages: {
    home: './src/pages/home.astro',
    post: './src/pages/post.astro',
    archive: './src/pages/archive.astro',
    page: './src/pages/page.astro',
  },
  settings: {
    accentColor: {
      type: 'color',
      label: '强调色',
      default: '#2255aa',
    },
  },
});
