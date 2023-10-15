import { defineConfig } from 'dumi';

const repo = 'react-book';

export default defineConfig({
  title: repo,
  favicon: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg',
  logo: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  locales: [['zh-CN', '中文']],
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/hua-bang/react-book',
    },
  ],
  // more config: https://d.umijs.org/config
});
