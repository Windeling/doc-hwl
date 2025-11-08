// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  // ---------- 基础配置 ----------
  lang: "zh-CN",
  title: "Windelingの間 文档",
  description: "属于「黄文林」的知识库、清单和说明书",

  // ---------- 打包器 ----------
  bundler: viteBundler(),

  // ---------- 头部标签 ----------
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "keywords", content: "文档,知识库,黄文林" }],
  ],

  // ---------- 主题：hope ----------
  theme: hopeTheme({
    // ----- 基础信息 -----
    author: "黄文林",
    logo: "https://vuejs.press/images/hero.png",

    // ----- 导航栏（保持你原来的结构） -----
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

    // ----- 侧边栏：自动生成（structure） -----
    // 所有目录都使用文件结构自动生成，新增文件即自动出现
    sidebar: {
      // 1. 拾枝杂谈
      "/chat/": "headers",

      // 2. 文档说明
      "/docs/": "headers",

      // 3. 学习笔记
      "/study/": "headers",

      // 4. 摄影风光（包括所有子目录）
      "/photo/": "headers",

      // 5. 其它未匹配路径（首页、根目录等）使用根结构
      "/": "structure",
    },

    // ----- 其它功能（全部保留你原来的设置） -----
    // 颜色模式
    darkmode: "switch",           // 自动 / 手动切换
    themeColor: true,

    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: "最后更新",

    // 编辑链接
    editLink: true,
    editLinkPattern: ":repo/edit/:branch/:path",
    editLinkText: "在 GitHub 上完善此页面",

    // 仓库信息
    repo: "Windeling/doc-hwl",
    repoLabel: "GitHub",
    docsDir: "docs",
    docsBranch: "main",

    // 贡献者
    contributors: true,
    contributorsText: "贡献者",

    // ----- 额外插件（hope 内置） -----
    plugins: {
      // 代码复制按钮
      copyCode: { showInMobile: true },

      // Markdown 增强
      mdEnhance: {
        // 启用任务列表、脚注、上标、下标等
        tasklist: true,
        footnote: true,
        sup: true,
        sub: true,
        // 图片懒加载
        imageLazyload: true,
      },

      // 搜索（本地搜索，体积小）
      search: true,
    },
  }),
});
