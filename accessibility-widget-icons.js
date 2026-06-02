(function () {
    'use strict';

    var iconSet = {
        launcher: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 2 7v6c0 5.3 3.8 9.9 9 11 5.2-1.1 9-5.7 9-11V7L12 2Zm0 3.1 6 2.9V13c0 4.1-2.7 7.8-6 8.9-3.3-1.1-6-4.8-6-8.9V8l6-2.9Zm-1 4.2v5.4h2V9.3h-2Zm0 6.8v2h2v-2h-2Z"></path></svg>',
        close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z"></path></svg>',
        fontSize: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h2.2l1-2.8h4.4l1 2.8H15L10.4 7H8.6L4 20Zm4-4.8L9.5 11 11 15.2H8Zm7.2-5.7V7.7H22v1.8h-2.4V20h-2.1V9.5h-2.3Z"></path></svg>',
        highContrast: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 2v14a7 7 0 0 1 0-14Z"></path></svg>',
        monochrome: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 2v10h3V7H7Zm5 0v10h5V7h-5Z"></path></svg>',
        highlightLinks: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 15.8a3.9 3.9 0 0 1 0-5.5l2.2-2.2a3.9 3.9 0 0 1 5.5 5.5l-.7.7-1.4-1.4.7-.7a1.9 1.9 0 0 0-2.7-2.7L9.6 11.7a1.9 1.9 0 1 0 2.7 2.7l.2-.2 1.4 1.4-.2.2a3.9 3.9 0 0 1-5.5 0Zm7.6-7.6a3.9 3.9 0 0 1 5.5 5.5l-2.2 2.2a3.9 3.9 0 0 1-5.5-5.5l.2-.2 1.4 1.4-.2.2a1.9 1.9 0 1 0 2.7 2.7l2.2-2.2a1.9 1.9 0 0 0-2.7-2.7l-.7.7-1.4-1.4.7-.7Z"></path></svg>',
        readableFont: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3V6Zm4 5h10v2H7v-2Zm-2 5h14v2H5v-2Z"></path></svg>',
        lineHeight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h2v16H7V4Zm8 0h2v16h-2V4ZM3 8h2v8H3V8Zm16 0h2v8h-2V8Zm-8 0h2v8h-2V8Z"></path></svg>',
        letterSpacing: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h2v12H5V6Zm12 0h2v12h-2V6Zm-7 0h4l3 12h-2l-.6-2.5H9.6L9 18H7L10 6Zm-.1 7.5h3.2L11.5 8l-1.6 5.5Z"></path></svg>',
        hideImages: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2.3 3.7 18 18-1.4 1.4-2.8-2.8H5a2 2 0 0 1-2-2V6.1L.9 4l1.4-1.4ZM7.7 8l-2.7 2.7v7.6h9.1l-1.8-1.8-2.1 2.1-3-3L5 18V10.7L8.3 7.4 7.7 8Zm13.3 5.7-2-2V8.7h-3.1l-2-2H19a2 2 0 0 1 2 2v5Z"></path></svg>',
        reduceMotion: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 15.2-3.4l1.8-1A10 10 0 1 0 22 12h-2a8 8 0 0 1-16 0Zm8-3a3 3 0 1 0 3 3h-3V9Z"></path></svg>',
        focusOutline: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2H6v4H4V4Zm10 0h6v6h-2V6h-4V4ZM4 14h2v4h4v2H4v-6Zm14 0h2v6h-6v-2h4v-4ZM9 9h6v6H9V9Z"></path></svg>',
        reset: '<svg data-v-6c57e751="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw-icon h-3.5 w-3.5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>'
    };

    window.__KSU_A11Y_ICON_SET__ = window.__KSU_A11Y_ICON_SET__ || {};

    for (var key in iconSet) {
        if (Object.prototype.hasOwnProperty.call(iconSet, key)) {
            window.__KSU_A11Y_ICON_SET__[key] = iconSet[key];
        }
    }

    if (window.KsuAccessibilityWidget && typeof window.KsuAccessibilityWidget.registerIcons === 'function') {
        window.KsuAccessibilityWidget.registerIcons(iconSet);
    }

    if (window.KsuAccessibilityWidgetV1 && typeof window.KsuAccessibilityWidgetV1.registerIcons === 'function') {
        window.KsuAccessibilityWidgetV1.registerIcons(iconSet);
    }
})();
