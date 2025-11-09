import { defineClientConfig } from "vuepress/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";

export default defineClientConfig({
  setup() {
    // 配置透明导航栏
    setupTransparentNavbar({
      type: "homepage", // 可选值: "homepage" | "blog-homepage" | "all"
      threshold: 50,    // 滚动距离阈值，超过此距离后导航栏不再透明
      light: "#000000", // 浅色模式下的字体颜色
      dark: "#ffffff"   // 深色模式下的字体颜色
    });

    // 配置运行时间显示
    setupRunningTimeFooter(
      // 开始计算的日期（可以是字符串或 Date 对象）
      new Date("2025-11-08"), // 请修改为您网站的实际上线日期
      
      // 多语言配置
      {
        "/": " <br> Running time: :day days :hour hours :minute minutes :second seconds",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
        // 可以添加更多语言...
      },
      
      // 是否保留原有页脚内容
      true
    );
  },
});
