/**
 * Lightweight bilingual localization (zh / en) with persistence.
 */
(function () {
  const STORAGE_KEY = 'webstack-lang';

  const locales = {
    zh: {
      title_index: 'WebStack - 个人网址导航',
      title_about: '关于 - WebStack 个人网址导航',
      title_404: '404 - WebStack',
      skip_to_content: '跳到主要内容',
      nav_primary_label: '分类导航',
      nav_drawer_label: '导航菜单',
      open_menu: '打开导航菜单',
      close_menu: '关闭导航菜单',
      collapse_sidebar: '收起侧边栏',
      expand_sidebar: '展开侧边栏',
      search_label: '搜索导航站点',
      search_placeholder: '搜索站点名称、描述或网址…',
      clear_search: '清空搜索',
      lang_toggle_text: 'EN',
      lang_toggle_label: 'Switch to English',
      theme_switch_dark: '切换到深色模式',
      theme_switch_light: '切换到浅色模式',
      github_label: 'GitHub 仓库',
      about_site_nav: '关于本站',
      back_home: '返回首页',
      back_top: '回到顶部',
      results_status: '已显示 {count} 个站点',
      no_results_title: '未找到匹配的站点',
      no_results_desc: '没有找到与 “{keyword}” 相关的导航，请尝试更换关键词或清空搜索。',
      about_site: '关于网站',
      about_site_p1: '这是一个基于 WebStackPage 重构的极简、零构建个人网址导航页。',
      about_site_p2: '完全采用原生 HTML / CSS / JavaScript 构建，零外部运行时依赖，支持本地秒开、响应式侧边栏、暗黑模式与中英双语切换。',
      about_site_p3: '通过编辑 nav-data.js 即可集中维护分类、图标与中英双语卡片信息，无需修改页面结构。',
      about_project: '关于项目',
      about_project_desc: '极简、零构建个人网址导航工作台。',
      about_project_p1: '本项目基于 WebStackPage 二次设计与原生重构。',
      about_project_p2: '如果您对本项目感兴趣，或想部署自己的个人导航页，欢迎访问 GitHub 项目主页获取源码。',
      about_visit_repo: '访问 GitHub 仓库',
      error_404_heading: '页面走丢了',
      error_404_desc: '您访问的页面不存在或已被移除，可以返回导航首页继续浏览。'
    },
    en: {
      title_index: 'WebStack - Personal Navigation',
      title_about: 'About - WebStack Personal Navigation',
      title_404: '404 - WebStack',
      skip_to_content: 'Skip to main content',
      nav_primary_label: 'Category navigation',
      nav_drawer_label: 'Navigation drawer',
      open_menu: 'Open navigation menu',
      close_menu: 'Close navigation menu',
      collapse_sidebar: 'Collapse sidebar',
      expand_sidebar: 'Expand sidebar',
      search_label: 'Search navigation links',
      search_placeholder: 'Search titles, descriptions, or URLs…',
      clear_search: 'Clear search',
      lang_toggle_text: '中文',
      lang_toggle_label: '切换到中文',
      theme_switch_dark: 'Switch to dark theme',
      theme_switch_light: 'Switch to light theme',
      github_label: 'GitHub Repository',
      about_site_nav: 'About',
      back_home: 'Back to home',
      back_top: 'Back to top',
      results_status: 'Showing {count} sites',
      no_results_title: 'No matching sites found',
      no_results_desc: 'No sites match "{keyword}". Try another keyword or clear the search.',
      about_site: 'About the site',
      about_site_p1: 'A minimalist, zero-build personal navigation dashboard reimagined from WebStackPage.',
      about_site_p2: 'Built purely with native HTML, CSS, and vanilla JavaScript with zero runtime dependencies—featuring instant loading, responsive drawer navigation, system-aware dark mode, and bilingual switching.',
      about_site_p3: 'Categories and bilingual link metadata are managed centrally in nav-data.js without touching HTML.',
      about_project: 'About the project',
      about_project_desc: 'Minimalist & zero-build personal navigation workbench.',
      about_project_p1: 'Open-source project redesigned and rewritten from WebStackPage.',
      about_project_p2: 'If you would like to deploy your own personal navigation page, visit the GitHub repository for the source code.',
      about_visit_repo: 'Open GitHub Repository',
      error_404_heading: 'Page not found',
      error_404_desc: 'The page you requested does not exist or has been moved. Return to the navigation homepage.'
    }
  };

  function detectInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (_) {}
    const browserLang = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  }

  let currentLang = detectInitialLang();

  function t(key, vars) {
    const dict = locales[currentLang] || locales.zh;
    let text = dict[key] !== undefined ? dict[key] : (locales.zh[key] || key);
    if (vars) {
      Object.keys(vars).forEach((k) => {
        text = text.replace(`{${k}}`, String(vars[k]));
      });
    }
    return text;
  }

  function pickLocalized(value, fallbackLang) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[currentLang] || value[fallbackLang || 'zh'] || value.en || '';
  }

  function applyDomTranslations() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

    const titleKey = document.body?.getAttribute('data-i18n-title-key');
    if (titleKey) {
      document.title = t(titleKey);
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      el.setAttribute('aria-label', t(key));
    });
  }

  function setLang(lang) {
    if (lang !== 'zh' && lang !== 'en') return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
    applyDomTranslations();
    window.dispatchEvent(new CustomEvent('webstack:langchange', { detail: { lang } }));
  }

  function toggleLang() {
    setLang(currentLang === 'zh' ? 'en' : 'zh');
  }

  window.WebStackI18n = {
    getLang: () => currentLang,
    setLang,
    toggleLang,
    t,
    pickLocalized,
    applyDomTranslations
  };

  document.addEventListener('DOMContentLoaded', applyDomTranslations);
})();
