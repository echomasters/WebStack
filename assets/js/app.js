/**
 * WebStack zero-build client runtime:
 * - Safe DOM rendering for sidebar & site cards
 * - Live bilingual switching (zh / en)
 * - Fast zero-thrashing search (title, desc, url, category) + IME-safe Enter
 * - Two-state light/dark toggle synced with <meta name="color-scheme">
 * - Native Scrollspy (scroll-target-group + IntersectionObserver fallback)
 * - Responsive sidebar / mobile swipe drawer (navigation-drawer spec)
 */
(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SIDEBAR_KEY = 'webstack-sidebar-collapsed';

  const ICON_PATHS = {
    star: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
    globe: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
    trending: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
    sparkles: ['M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9L12 3z', 'M5 3v4', 'M3 5h4', 'M19 17v4', 'M17 19h4'],
    compass: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z'],
    wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
    server: ['M2 4h20v6H2z', 'M2 14h20v6H2z', 'M6 7h.01', 'M6 17h.01'],
    play: ['M5 3l14 9-14 9V3z'],
    monitor: ['M2 3h20v14H2z', 'M8 21h8', 'M12 17v4'],
    tag: ['M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z', 'M7 7h.01']
  };

  function createSvgIcon(name, className) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    if (className) svg.setAttribute('class', className);

    const paths = ICON_PATHS[name] || ICON_PATHS.tag;
    paths.forEach((d) => {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    return svg;
  }

  /* ========================================================================
     1. Two-state Theme Toggle (dark-mode-toggle spec)
     ======================================================================== */
  function initThemeToggle() {
    const meta = document.querySelector('meta[name="color-scheme"]');
    const toggleBtn = document.getElementById('theme-toggle');
    if (!meta || !toggleBtn) return;

    const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function getRenderedScheme() {
      if (meta.content === 'dark') return 'dark';
      if (meta.content === 'light') return 'light';
      return systemQuery.matches ? 'dark' : 'light';
    }

    toggleBtn.addEventListener('click', () => {
      const systemScheme = systemQuery.matches ? 'dark' : 'light';
      const targetScheme = getRenderedScheme() === 'dark' ? 'light' : 'dark';

      if (targetScheme === systemScheme) {
        try {
          localStorage.removeItem('color-scheme');
        } catch (_) {}
        meta.content = 'light dark';
      } else {
        try {
          localStorage.setItem('color-scheme', targetScheme);
        } catch (_) {}
        meta.content = targetScheme;
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key !== 'color-scheme') return;
      meta.content = event.newValue === 'light' || event.newValue === 'dark'
        ? event.newValue
        : 'light dark';
    });
  }

  /* ========================================================================
     2. Language Toggle
     ======================================================================== */
  function initLangToggle() {
    const langBtn = document.getElementById('lang-toggle');
    if (!langBtn || !window.WebStackI18n) return;

    function syncLabel() {
      langBtn.textContent = window.WebStackI18n.t('lang_toggle_text');
      langBtn.setAttribute('aria-label', window.WebStackI18n.t('lang_toggle_label'));
    }

    syncLabel();
    langBtn.addEventListener('click', () => {
      window.WebStackI18n.toggleLang();
    });
    window.addEventListener('webstack:langchange', syncLabel);
  }

  /* ========================================================================
     3. Navigation Rendering & Zero-Thrashing Search (index.html only)
     ======================================================================== */
  let scrollSpyObserver = null;
  let scrollEndAbortController = null;

  function setupScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('#sidebar-list a.sidebar-link'));
    const sections = Array.from(document.querySelectorAll('#nav-sections .category-section'));
    if (!navLinks.length || !sections.length) return;

    if (scrollSpyObserver) {
      scrollSpyObserver.disconnect();
      scrollSpyObserver = null;
    }
    if (scrollEndAbortController) {
      scrollEndAbortController.abort();
      scrollEndAbortController = null;
    }

    if (CSS.supports('scroll-target-group: auto')) {
      scrollEndAbortController = new AbortController();
      const syncAriaCurrent = () => {
        const currentLink = document.querySelector('#sidebar-list a.sidebar-link:target-current');
        navLinks.forEach((link) => {
          link.setAttribute('aria-current', link === currentLink ? 'true' : 'false');
        });
      };
      syncAriaCurrent();
      document.addEventListener('scrollend', syncAriaCurrent, {
        passive: true,
        signal: scrollEndAbortController.signal
      });
      return;
    }

    scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('target-current', isActive);
            link.setAttribute('aria-current', String(isActive));
          });
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => scrollSpyObserver.observe(section));
  }

  function buildSiteCard(item, categoryText) {
    const i18n = window.WebStackI18n;
    const titleText = i18n.pickLocalized(item.title);
    const descText = i18n.pickLocalized(item.desc);

    const card = document.createElement('a');
    card.className = 'nav-card';
    card.href = item.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    // Store lowercase search haystack covering both languages + URL + category
    const titleZh = typeof item.title === 'string' ? item.title : (item.title?.zh || '');
    const titleEn = typeof item.title === 'string' ? item.title : (item.title?.en || '');
    const descZh = typeof item.desc === 'string' ? item.desc : (item.desc?.zh || '');
    const descEn = typeof item.desc === 'string' ? item.desc : (item.desc?.en || '');
    card.dataset.search = `${titleZh} ${titleEn} ${descZh} ${descEn} ${categoryText} ${item.url}`.toLowerCase();

    const logoBox = document.createElement('span');
    logoBox.className = 'nav-card-logo';

    const img = document.createElement('img');
    img.src = item.logo;
    img.alt = '';
    img.width = 36;
    img.height = 36;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      img.remove();
      const fallback = document.createElement('span');
      fallback.className = 'nav-card-fallback';
      fallback.setAttribute('aria-hidden', 'true');
      fallback.textContent = (titleText || '?').trim().charAt(0).toUpperCase();
      logoBox.appendChild(fallback);
    }, { once: true });

    logoBox.appendChild(img);

    const body = document.createElement('span');
    body.className = 'nav-card-body';

    const titleEl = document.createElement('strong');
    titleEl.className = 'nav-card-title';
    titleEl.textContent = titleText;

    const descEl = document.createElement('p');
    descEl.className = 'nav-card-desc';
    descEl.textContent = descText;

    body.append(titleEl, descEl);
    card.append(logoBox, body);
    return card;
  }

  function renderNavigation() {
    const data = window.NAV_DATA;
    const i18n = window.WebStackI18n;
    const sidebarList = document.getElementById('sidebar-list');
    const sectionsRoot = document.getElementById('nav-sections');
    if (!Array.isArray(data) || !sidebarList || !sectionsRoot || !i18n) return;

    sidebarList.textContent = '';
    sectionsRoot.textContent = '';

    const sidebarFrag = document.createDocumentFragment();
    const sectionsFrag = document.createDocumentFragment();

    data.forEach((cat) => {
      const catName = i18n.pickLocalized(cat.name);
      const catSearchNames = `${cat.name?.zh || ''} ${cat.name?.en || ''}`;

      // Sidebar link
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'sidebar-link';
      link.href = `#${cat.id}`;
      link.title = catName;

      const labelSpan = document.createElement('span');
      labelSpan.className = 'sidebar-label';
      labelSpan.textContent = catName;

      const countSpan = document.createElement('span');
      countSpan.className = 'sidebar-count';
      countSpan.textContent = String(cat.items.length);

      link.append(createSvgIcon(cat.icon, 'sidebar-icon'), labelSpan, countSpan);
      li.appendChild(link);
      sidebarFrag.appendChild(li);

      // Main section
      const section = document.createElement('section');
      section.className = 'category-section';
      section.id = cat.id;
      section.tabIndex = -1;

      const header = document.createElement('div');
      header.className = 'category-header';

      const heading = document.createElement('h2');
      heading.className = 'category-title';
      heading.textContent = catName;

      const secCount = document.createElement('span');
      secCount.className = 'category-count';
      secCount.textContent = `(${cat.items.length})`;

      header.append(createSvgIcon(cat.icon, 'category-icon'), heading, secCount);

      const grid = document.createElement('div');
      grid.className = 'cards-grid';
      cat.items.forEach((item) => {
        grid.appendChild(buildSiteCard(item, catSearchNames));
      });

      section.append(header, grid);
      sectionsFrag.appendChild(section);
    });

    sidebarList.appendChild(sidebarFrag);
    sectionsRoot.appendChild(sectionsFrag);
    setupScrollSpy();
  }

  function initSearch() {
    const input = document.getElementById('search-input');
    const searchWrap = document.getElementById('search-wrap');
    const clearBtn = document.getElementById('search-clear');
    const emptyState = document.getElementById('empty-state');
    const emptyDesc = document.getElementById('empty-state-desc');
    const emptyClearBtn = document.getElementById('empty-clear-btn');
    const liveRegion = document.getElementById('search-live-status');
    if (!input || !searchWrap) return;

    let announceTimer = null;

    function filterNav(rawQuery) {
      const query = rawQuery.trim().toLowerCase();
      searchWrap.classList.toggle('has-value', rawQuery.length > 0);

      const sections = document.querySelectorAll('#nav-sections .category-section');
      let totalVisible = 0;

      sections.forEach((section) => {
        const cards = section.querySelectorAll('.nav-card');
        let sectionVisible = 0;

        cards.forEach((card) => {
          const matched = !query || (card.dataset.search || '').includes(query);
          card.hidden = !matched;
          if (matched) sectionVisible += 1;
        });

        section.hidden = sectionVisible === 0;
        const countEl = section.querySelector('.category-count');
        if (countEl) countEl.textContent = `(${sectionVisible})`;
        totalVisible += sectionVisible;
      });

      const showEmpty = totalVisible === 0 && query !== '';
      if (emptyState) {
        emptyState.hidden = !showEmpty;
        if (showEmpty && emptyDesc && window.WebStackI18n) {
          emptyDesc.textContent = window.WebStackI18n.t('no_results_desc', { keyword: rawQuery.trim() });
        }
      }

      if (liveRegion && window.WebStackI18n) {
        window.clearTimeout(announceTimer);
        announceTimer = window.setTimeout(() => {
          liveRegion.textContent = window.WebStackI18n.t('results_status', { count: totalVisible });
        }, 250);
      }
    }

    function clearSearch() {
      input.value = '';
      filterNav('');
      input.focus();
    }

    input.addEventListener('input', () => filterNav(input.value));

    // IME-safe Enter handling: open first visible result if query is non-empty
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (input.value) {
          event.preventDefault();
          clearSearch();
        } else {
          input.blur();
        }
        return;
      }

      if (event.key === 'Enter') {
        if (event.isComposing || event.keyCode === 229) return;
        const query = input.value.trim();
        if (!query) return;
        const firstCard = document.querySelector('#nav-sections .nav-card:not([hidden])');
        if (firstCard) {
          event.preventDefault();
          window.open(firstCard.href, '_blank', 'noopener,noreferrer');
        }
      }
    });

    clearBtn?.addEventListener('click', clearSearch);
    emptyClearBtn?.addEventListener('click', clearSearch);

    // Global "/" or Cmd/Ctrl+K or instant printable typing ("即敲即搜")
    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.focus();
        input.select();
        return;
      }

      const target = event.target;
      const isEditable = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      );
      if (isEditable || event.ctrlKey || event.altKey || event.metaKey) return;

      if (event.key === '/') {
        event.preventDefault();
        input.focus();
      } else if (event.key && event.key.length === 1 && event.key !== ' ') {
        input.focus();
      }
    });

    window.addEventListener('webstack:langchange', () => {
      renderNavigation();
      filterNav(input.value);
    });
  }

  /* ========================================================================
     4. Responsive Sidebar & Mobile Swipe Drawer (navigation-drawer spec)
     ======================================================================== */
  function initNavigationDrawer() {
    const shell = document.getElementById('app-shell');
    const drawer = document.getElementById('drawer');
    const openBtn = document.getElementById('drawer-open');
    const closeBtn = document.getElementById('drawer-close');
    const collapseBtn = document.getElementById('sidebar-collapse');
    const workspace = document.getElementById('workspace');
    if (!shell || !drawer || !workspace) return;

    const scroller = drawer.querySelector('.Drawer-scroller');
    const sheet = drawer.querySelector('.Drawer-sheet');
    const mobileQuery = window.matchMedia('(max-width: 899px)');

    // Desktop sidebar collapse persistence
    function applyDesktopCollapse(collapsed) {
      shell.classList.toggle('is-sidebar-collapsed', collapsed);
      if (collapseBtn && window.WebStackI18n) {
        collapseBtn.setAttribute('aria-expanded', String(!collapsed));
        collapseBtn.setAttribute(
          'aria-label',
          window.WebStackI18n.t(collapsed ? 'expand_sidebar' : 'collapse_sidebar')
        );
      }
    }

    let isCollapsed = false;
    try {
      isCollapsed = localStorage.getItem(SIDEBAR_KEY) === 'true';
    } catch (_) {}
    applyDesktopCollapse(isCollapsed);

    collapseBtn?.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      try {
        localStorage.setItem(SIDEBAR_KEY, String(isCollapsed));
      } catch (_) {}
      applyDesktopCollapse(isCollapsed);
    });

    window.addEventListener('webstack:langchange', () => applyDesktopCollapse(isCollapsed));

    // Mobile drawer mode using popover="manual" + role="dialog" + inert
    function syncDrawerMode() {
      if (mobileQuery.matches) {
        drawer.setAttribute('popover', 'manual');
        drawer.setAttribute('role', 'dialog');
      } else {
        if (drawer.hasAttribute('aria-modal')) {
          try {
            drawer.hidePopover();
          } catch (_) {}
          workspace.inert = false;
          drawer.removeAttribute('aria-modal');
          openBtn?.setAttribute('aria-expanded', 'false');
        }
        drawer.removeAttribute('popover');
        drawer.removeAttribute('role');
      }
    }

    syncDrawerMode();
    mobileQuery.addEventListener('change', syncDrawerMode);

    if (!scroller || !sheet || !openBtn || !closeBtn) return;

    async function openDrawer() {
      if (!mobileQuery.matches) return;
      drawer.showPopover();
      workspace.inert = true;
      drawer.setAttribute('aria-modal', 'true');

      if (!CSS.supports('scroll-initial-target', 'nearest')) {
        scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'instant' });
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      }
      scroller.scrollTo({ left: 0, behavior: 'auto' });
    }

    function closeDrawer() {
      if (!drawer.hasAttribute('aria-modal')) return;
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'auto' });
    }

    function onDrawerOpened() {
      openBtn.setAttribute('aria-expanded', 'true');
    }

    function onDrawerClosed() {
      if (!drawer.hasAttribute('aria-modal')) return;
      try {
        drawer.hidePopover();
      } catch (_) {}
      workspace.inert = false;
      drawer.removeAttribute('aria-modal');
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus();
    }

    const visibleThreshold = 1 / Math.max(window.innerWidth, 320);
    const drawerObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1);
        if (!entry) return;
        if (entry.intersectionRatio < visibleThreshold) onDrawerClosed();
        if (entry.intersectionRatio === 1) onDrawerOpened();
      },
      { root: drawer, threshold: [visibleThreshold, 1] }
    );
    drawerObserver.observe(sheet);

    if (!CSS.supports('animation-timeline: scroll()')) {
      scroller.addEventListener('scroll', () => {
        const width = sheet.offsetWidth || 1;
        const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / width));
        drawer.style.setProperty('--drawer-backdrop', String(ratio));
      }, { passive: true });
    }

    openBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);

    drawer.addEventListener('click', (event) => {
      if (!sheet.contains(event.target)) {
        closeDrawer();
      }
    });

    // Close mobile drawer after picking a category link
    drawer.addEventListener('click', (event) => {
      const link = event.target.closest('a.sidebar-link');
      if (link && mobileQuery.matches) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.hasAttribute('aria-modal')) {
        closeDrawer();
      }
    });
  }

  /* ========================================================================
     5. Footer Year & Back to Top
     ======================================================================== */
  function initFooterUtilities() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    const backTopBtn = document.getElementById('back-to-top');
    backTopBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLangToggle();
    renderNavigation();
    initSearch();
    initNavigationDrawer();
    initFooterUtilities();
  });
})();
