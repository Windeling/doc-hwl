// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";

// 导入所有插件
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { copyCodePlugin } from '@vuepress/plugin-copy-code';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon';
import { gitPlugin } from '@vuepress/plugin-git';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';
import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { pwaPlugin } from '@vuepress/plugin-pwa';
import { searchPlugin } from '@vuepress/plugin-search';

export default defineUserConfig({
  lang: "zh-CN",
  title: "Windeling 文档（beta）",
  description: "属于「黄文林」的知识库、清单和说明书",

  bundler: viteBundler(),

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "keywords", content: "文档,知识库,黄文林" }],
  ],

  // 添加顶级的 plugins 数组，用于官方插件
  plugins: [
    activeHeaderLinksPlugin({
      // 可选配置，例如延迟时间
      delay: 200,
    }),
    backToTopPlugin({
      // 可选：阈值高度（默认 300px）
      threshold: 300,
    }),
    copyCodePlugin({
      // 可选：显示复制按钮的延迟（毫秒）
      showInMobile: false, // 是否在移动端显示
    }),
    docsearchPlugin({
      // 需要替换为您的 Algolia 凭证
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
    }),
    externalLinkIconPlugin({
      // 可选：本地化支持
      locales: {
        '/': {
          openInNewWindow: 'open in new window',
        },
      },
    }),
    gitPlugin({
      // 可选：贡献者信息
      contributors: true,
    }),
    mediumZoomPlugin({
      // 可选：选择器
      selector: '.theme-default-content img',
    }),
    nprogressPlugin(),
    pwaPlugin({
      // 可选：服务 worker 配置
      serviceWorker: true,
    }),
    searchPlugin({
      // 可选：热键支持
      hotKeys: ['s', '/'],
    }),
  ],

  theme: hopeTheme({
    author: "黄文林",
    logo: "https://vuejs.press/images/hero.png",

    navbar: [
      { text: "首页", link: "/" },
      {
        text: "拾枝杂谈",
        children: [
          { text: "奇思妙想", link: "/chat/thought/" },
          { text: "朴实生活", link: "/chat/life/" },
        ],
      },
      { text: "文档说明", link: "/doc/" },
      { text: "学习笔记", link: "/study/" },
      {
        text: "摄影风光",
        children: [
          {
            text: "风光摄影",
            children: [
              { text: "山水风光", link: "/photo/landscape/mountain-water/" },
              { text: "海滨风光", link: "/photo/landscape/beach/" },
              { text: "星空摄影", link: "/photo/landscape/star/" },
            ],
          },
        ],
      },
    ],

    sidebar: {
      "/chat/": "structure",
      "/doc/": "structure",
      "/study/": "structure",
      "/photo/": "structure",
      "/": "structure",
    },

    darkmode: "switch",
    lastUpdated: true,
    lastUpdatedText: "最后更新",
    editLink: true,
    editLinkPattern: ":repo/edit/:branch/:path",
    editLinkText: "在 GitHub 上完善此页面",
    repo: "Windeling/space-hwl",
    repoLabel: "GitHub",
    docsDir: "docs",
    docsBranch: "main",
    contributors: true,
    contributorsText: "贡献者",

    plugins: {
      copyCode: { showInMobile: true },
      mdEnhance: {
        tasklist: true,
        footnote: true,
        imageLazyload: true,
      },
      
      search: true,
    },
  }),
});