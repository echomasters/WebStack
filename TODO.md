# WebStack Optimization Roadmap

In order to continuously improve user experience, boost project activity, and lay the foundation for adopting team security tools like 1Password, the following optimizations are planned:

## 🌟 Phase 1: UX Enhancements (Quick Wins)
- [x] **Global Fast Search (Local Search)**
  - Implement real-time client-side search based on `nav-data.js` (`/` and `Cmd/Ctrl + K` focus, zero-DOM-rebuild filtering, IME-safe `Enter` to open the top match).
- [x] **URL & Bilingual Keyword Matching**
  - Match against item URLs, categories, and both Chinese & English titles/descriptions.
- [ ] **Pinyin Search**
  - Support pinyin input to match Chinese titles (e.g. typing `zhihu` or `zh` finds「知乎」), including full pinyin and initial letters.
  - Options: introduce `pinyin-pro` or embed lightweight `pinyin` metadata fields in `nav-data.js` to preserve zero-dependency architecture.
- [x] **Dark Mode Toggle**
  - Implemented system-aware dark mode via `<meta name="color-scheme">` + CSS `light-dark()` tokens, FOUC prevention, and a two-state toggle synced across tabs via `localStorage`.

## 🚀 Phase 2: Architecture Upgrades
- [x] **Dynamic i18n**
  - Implemented seamless bilingual switching (`zh` / `en`) via `assets/js/i18n.js`, topbar toggle button (`localStorage` persisted), and bilingual fields in `nav-data.js`.
- [x] **Zero-Build Native Rewrite**
  - Replaced legacy jQuery, Bootstrap 3, TweenMax, Xenon template CSS/JS, and 5 icon font packs with pure native HTML, CSS Grid/Variables, inline SVGs, and vanilla JavaScript.
- [ ] **Click Stats & Recent Visits**
  - Track link click counts in `localStorage` (purely local, no external tracking).
  - Add a「最近访问」(Recent Visits) section at the top showing the last 5–8 clicked links.
  - Future: enable smart sorting within「常用推荐」by click frequency when link count grows past 50+.
- [ ] **PWA Support**
  - Add `manifest.json` and `Service Worker` for offline caching and desktop installation.

## 🛠️ Phase 3: Advanced Evolution
- [ ] **Automated CI/CD**
  - Set up GitHub Actions (`.github/workflows/deploy.yml`) for automated deployments, utilizing 1Password Teams to securely manage deployment secrets and server credentials.
- [ ] **Subcategories (Two-level Navigation)**
  - Allow a category to optionally contain `subcategories` instead of flat `items`, for when link count grows significantly.
  - Backward-compatible data model: categories without `subcategories` render as before.
  - Sidebar gains collapsible sub-menus; main content area shows sub-headings under each parent category.
- [ ] **Data Admin Panel**
  - Introduce a lightweight backend (Node.js/Python) and a database for intuitive URL management, replacing manual JSON file edits.
