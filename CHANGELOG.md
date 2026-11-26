# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-11-26

### ⚠️ Breaking Changes
- **数据模型升级 (`assets/js/nav-data.js`)**：全局数据源由 `const navData` 升级为 `window.NAV_DATA`；分类新增稳定英文锚点 `id`（slug）与内联图标键 `icon`；分类名称、站点标题与描述支持 `{ zh, en }` 双语对象结构。
- **架构彻底原生化**：移除所有 jQuery、Bootstrap 3、TweenMax、Xenon 后台模板样式/脚本及图标字体目录，全面转向零构建原生 HTML / CSS / JavaScript。

### ✨ Added
- **暗黑模式（系统跟随 + 手动切换）**：基于 `<meta name="color-scheme">`、CSS `light-dark()` 色阶与同步防闪烁脚本，提供两态主题切换按钮并跨标签页持久化同步。
- **全站真双语支持**：在顶栏新增 `EN / 中文` 切换按钮（状态保存至 `localStorage`），实现界面文案、分类名称及站点卡片的即时双语联动。
- **现代响应式布局与导航交互**：
  - 桌面端采用 CSS Grid 自适应多列网格与可收起（状态持久化）左侧边栏，内置原生 Scrollspy（`scroll-target-group` + `IntersectionObserver` 回退）滚动高亮。
  - 移动端（`< 900px`）自动切换为原生 `popover="manual"` + `scroll-snap` 滑动抽屉，支持手势滑动、遮罩点击、`Esc` 关闭及 `inert` 焦点隔离。
- **搜索体验升级**：支持中英文标题、描述、分类与 URL 实时过滤；支持 `/`、`Cmd/Ctrl + K` 聚焦、输入法合成保护（IME-safe）的 `Enter` 直达首个匹配结果及 `Esc` 清空。
- **图标全本地化与容错**：为 `LDTools` 补充本地矢量图标 `assets/images/logos/ldtools.svg`，并增加图片加载失败时的首字母 Monogram 回退展示。

### ♻️ Changed
- 重构 [index.html](index.html)、[about.html](about.html) 与 [404.html](404.html)，统一视觉系统与明暗主题支持。
- 采用安全的 DOM API（`DocumentFragment` + `textContent`）一次性渲染节点，搜索过滤仅切换 `hidden` 属性，消除重绘闪烁，并使用浏览器原生 `<img loading="lazy">` 替代 `lozad.js`。
- 补齐语义化地标、跳转主内容快捷链接、`:focus-visible` 焦点轮廓与 `aria-live` 搜索结果播报。
- 更新 [README.md](README.md) 与 [TODO.md](TODO.md) 以反映新版数据结构与路线图进度。

### 🗑️ Removed
- 移除 `jquery-1.11.1.min.js`、`bootstrap.css` / `bootstrap.min.js`、`TweenMax.min.js`、`lozad.js`、`xenon-*` 系列模板文件、`nav-renderer.js`、`main.js` 及 `assets/css/fonts/` 下的 5 套旧版字体图标库。
