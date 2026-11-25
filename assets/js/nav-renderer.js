/**
 * Navigation renderer - dynamically builds the navigation grid and sidebar
 * from nav-data.js data source.
 */

/**
 * Escapes HTML special characters to prevent XSS attacks.
 * @param {string} str - The string to escape
 * @returns {string} The escaped HTML string
 */
function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

var lozadObserver = null;

function getI18nText(key, fallback) {
    if (typeof locales !== 'undefined' && typeof currentLang !== 'undefined' && locales[currentLang] && locales[currentLang][key]) {
        return locales[currentLang][key];
    }
    return fallback;
}

$(document).ready(function () {
    renderNav();
    renderSidebar();

    // Bind search event (using event delegation and multiple events for compatibility)
    $(document).on('input propertychange', '#search-input', function() {
        renderNav($(this).val());
    });

    // Clear search on Escape key
    $(document).on('keydown', '#search-input', function(e) {
        if (e.key === 'Escape' && $(this).val()) {
            $(this).val('');
            renderNav('');
        }
    });

    // Clear search button in empty state
    $(document).on('click', '#clear-search-btn', function() {
        $('#search-input').val('').focus();
        renderNav('');
    });

    // Global keyboard listener: Focus search input when typing anywhere (即敲即搜)
    $(document).on('keydown', function(e) {
        // Ignore if user is already focused on an input, textarea, select, or editable element
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.isContentEditable) return;
        // Ignore modifier keys
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        // Check if it's a printable non-space character key
        if (e.key && e.key.length === 1 && e.key !== ' ') {
            $('#search-input').focus();
        }
    });
});

function renderNav(keyword) {
    keyword = keyword || "";
    var container = $('#main-content-container');
    if (!container.length) return;

    var html = '';
    var lowerKeyword = keyword.toLowerCase();

    navData.forEach(function (category) {
        // Filter items based on keyword
        var filteredItems = category.items.filter(function(item) {
            var titleMatch = item.title && item.title.toString().toLowerCase().indexOf(lowerKeyword) !== -1;
            var descMatch = item.desc && item.desc.toString().toLowerCase().indexOf(lowerKeyword) !== -1;
            return titleMatch || descMatch;
        });

        // Skip category if no items match
        if (filteredItems.length === 0) return;

        // Render Category Header
        var safeCategoryName = escapeHtml(category.category);
        html += '<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="' + safeCategoryName + '"></i>' + safeCategoryName + '</h4>';

        // Render Items
        html += '<div class="row">';

        filteredItems.forEach(function (item) {
            var safeTitle = escapeHtml(item.title);
            var safeDesc = escapeHtml(item.desc);
            var safeUrl = escapeHtml(item.url);
            var safeLogo = escapeHtml(item.logo);

            html += '<div class="col-sm-3">';
            html += '<a class="xe-widget xe-conversations box2 nav-card" href="' + safeUrl + '" target="_blank" rel="noopener noreferrer" title="' + safeUrl + '">';
            html += '<div class="xe-comment-entry">';
            html += '<span class="xe-user-img">';
            html += '<img data-src="' + safeLogo + '" class="lozad img-circle" width="40" alt="' + safeTitle + '">';
            html += '</span>';
            html += '<div class="xe-comment">';
            html += '<span class="xe-user-name overflowClip_1">';
            html += '<strong>' + safeTitle + '</strong>';
            html += '</span>';
            html += '<p class="overflowClip_2">' + safeDesc + '</p>';
            html += '</div>'; // xe-comment
            html += '</div>'; // xe-comment-entry
            html += '</a>'; // nav-card
            html += '</div>'; // col-sm-3
        });

        html += '</div>'; // row
        html += '<br />';
    });

    if (html === '' && keyword.trim() !== '') {
        var safeKeyword = escapeHtml(keyword.trim());
        var emptyTitle = escapeHtml(getI18nText('no_results_title', '未找到匹配的站点'));
        var emptyDesc = escapeHtml(getI18nText('no_results_desc', '没有找到与 “{keyword}” 相关的导航，请尝试更换关键词。')).replace('{keyword}', safeKeyword);
        var clearLabel = escapeHtml(getI18nText('clear_search', '清空搜索'));

        html += '<div class="empty-search-state">';
        html += '<i class="fa-search empty-search-icon" aria-hidden="true"></i>';
        html += '<h4>' + emptyTitle + '</h4>';
        html += '<p>' + emptyDesc + '</p>';
        html += '<button type="button" id="clear-search-btn" class="btn btn-white btn-sm">' + clearLabel + '</button>';
        html += '</div>';
    }

    container.html(html);

    // Re-init Lazy Loading and clean up previous observer
    if (typeof lozad === 'function') {
        if (lozadObserver && lozadObserver.observer) {
            lozadObserver.observer.disconnect();
        }
        lozadObserver = lozad();
        lozadObserver.observe();
    }
}

function renderSidebar() {
    var container = $('#main-menu');

    var html = '';
    navData.forEach(function (category) {
        var safeCategoryName = escapeHtml(category.category);
        html += '<li>';
        html += '    <a href="#' + safeCategoryName + '" class="smooth">';
        html += '        <i class="' + (category.icon || 'linecons-tag') + '"></i>';
        html += '        <span class="title">' + safeCategoryName + '</span>';
        html += '    </a>';
        html += '</li>';
    });

    container.prepend(html);
}
