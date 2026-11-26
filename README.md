<div align="center">
  <h1>WebStack - Personal Navigation Dashboard</h1>
  <p>
    A minimalist, zero-build, native HTML/CSS/JS personal navigation dashboard reimagined from <a href="https://github.com/WebStackPage/WebStackPage.github.io">WebStackPage</a>.
  </p>
  <p>
    <a href="https://nav.555212.xyz"><img src="https://img.shields.io/badge/Demo-nav.555212.xyz-blue?style=flat-square&logo=google-chrome" alt="Demo"></a>
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </p>
</div>

---

## 🌟 Key Features

* **⚡ Zero-Build & Zero-Dependency:** Pure vanilla HTML, CSS, and JavaScript (no jQuery, Bootstrap, or build toolchain). Works directly via `file://` or any static host.
* **🌗 System-Aware Dark Mode:** Uses native `color-scheme` and CSS `light-dark()` tokens with FOUC prevention and a two-state manual theme toggle synced across tabs.
* **🌐 Full Bilingual Support (中文 / English):** Topbar language switcher (`EN` / `中文`) backed by `assets/js/i18n.js` and bilingual entries in `assets/js/nav-data.js`.
* **🔍 Instant Keyboard-First Search:** Press `/` or `⌘K`/`Ctrl+K` (or just start typing) to filter across Chinese & English titles, descriptions, categories, and URLs; press `Enter` (IME-safe) to open the top match.
* **📱 Responsive Sidebar & Swipe Drawer:** Collapsible sticky sidebar on desktop (with state persistence) and native top-layer swipe drawer on mobile, plus native Scrollspy category highlighting.

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/echomasters/WebStack.git
   ```
2. **Open locally:**
   Simply open `index.html` directly in your browser, or run any static server (e.g., `python -m http.server 8123`).

## 🛠️ Customizing Your Links

Edit `assets/js/nav-data.js` (`window.NAV_DATA`):

```javascript
window.NAV_DATA = [
  {
    id: 'recommended',
    icon: 'star', // star | globe | trending | sparkles | compass | wrench | server | play | monitor | tag
    name: { zh: '常用推荐', en: 'Favorites' },
    items: [
      {
        title: { zh: '知乎', en: 'Zhihu' }, // or a plain string like 'Bilibili'
        desc: { zh: '有问题，就会有答案', en: 'Chinese Q&A and knowledge community' },
        url: 'https://www.zhihu.com/hot',
        logo: 'assets/images/logos/zhihu.png'
      }
    ]
  }
];
```

## 🗺️ Roadmap

**[👉 View Optimization Roadmap](./TODO.md)**

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

© 2026 WebStack | Built by [echomasters](https://github.com/echomasters)
