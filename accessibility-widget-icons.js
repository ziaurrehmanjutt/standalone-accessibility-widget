(function () {
    'use strict';

    var iconSet = {
        launcher: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" class="h-7 w-7 fill-current" aria-hidden="true"><path data-v-6c57e751="" d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0Zm-.39,74.18L52.1,98.91a4.94,4.94,0,0,1-2.58,2.83A5,5,0,0,1,42.7,95.5l6.24-17.28a26.3,26.3,0,0,0,1.17-4,40.64,40.64,0,0,0,.54-4.18c.24-2.53.41-5.27.54-7.9s.22-5.18.29-7.29c.09-2.63-.62-2.8-2.73-3.3l-.44-.1-18-3.39A5,5,0,0,1,27.08,46a5,5,0,0,1,5.05-7.74l19.34,3.63c.77.07,1.52.16,2.31.25a57.64,57.64,0,0,0,7.18.53A81.13,81.13,0,0,0,69.9,42c.9-.1,1.75-.21,2.6-.29l18.25-3.42A5,5,0,0,1,94.5,39a5,5,0,0,1,1.3,7,5,5,0,0,1-3.21,2.09L75.15,51.37c-.58.13-1.1.22-1.56.29-1.82.31-2.72.47-2.61,3.06.08,1.89.31,4.15.61,6.51.35,2.77.81,5.71,1.29,8.4.31,1.77.6,3.19,1,4.55s.79,2.75,1.39,4.42l6.11,16.9a5,5,0,0,1-6.82,6.24,4.94,4.94,0,0,1-2.58-2.83L63,74.23,62,72.4l-1,1.78Zm.39-53.52a8.83,8.83,0,1,1-6.24,2.59,8.79,8.79,0,0,1,6.24-2.59Zm36.35,4.43a51.42,51.42,0,1,0,15,36.35,51.27,51.27,0,0,0-15-36.35Z"></path></svg>',
        close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z"></path></svg>',
        fontSize: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h2.2l1-2.8h4.4l1 2.8H15L10.4 7H8.6L4 20Zm4-4.8L9.5 11 11 15.2H8Zm7.2-5.7V7.7H22v1.8h-2.4V20h-2.1V9.5h-2.3Z"></path></svg>',
        highContrast: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 2v14a7 7 0 0 1 0-14Z"></path></svg>',
        monochrome: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4V5Zm3 2v10h3V7H7Zm5 0v10h5V7h-5Z"></path></svg>',
        highlightLinks: '<svg data-v-6c57e751="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-icon h-5 w-5"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" x2="16" y1="12" y2="12"></line></svg>',
        readableFont: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3V6Zm4 5h10v2H7v-2Zm-2 5h14v2H5v-2Z"></path></svg>',
        lineHeight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h2v16H7V4Zm8 0h2v16h-2V4ZM3 8h2v8H3V8Zm16 0h2v8h-2V8Zm-8 0h2v8h-2V8Z"></path></svg>',
        letterSpacingStep: '<svg data-v-6c57e751="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-horizontal-icon h-5 w-5"><path d="m18 8 4 4-4 4"></path><path d="M2 12h20"></path><path d="m6 8-4 4 4 4"></path></svg>',
        wordSpacingStep: '<svg data-v-6c57e751="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-whole-word-icon h-5 w-5"><circle cx="7" cy="12" r="3"></circle><path d="M10 9v6"></path><circle cx="17" cy="12" r="3"></circle><path d="M14 7v8"></path><path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"></path></svg>',
        hideImages: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2.3 3.7 18 18-1.4 1.4-2.8-2.8H5a2 2 0 0 1-2-2V6.1L.9 4l1.4-1.4ZM7.7 8l-2.7 2.7v7.6h9.1l-1.8-1.8-2.1 2.1-3-3L5 18V10.7L8.3 7.4 7.7 8Zm13.3 5.7-2-2V8.7h-3.1l-2-2H19a2 2 0 0 1 2 2v5Z"></path></svg>',
        reduceMotion: '<svg data-v-6c57e751="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-off-icon h-5 w-5"><path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"></path><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"></path><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"></path><path d="m2 2 20 20"></path></svg>',
        focusOutline: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2H6v4H4V4Zm10 0h6v6h-2V6h-4V4ZM4 14h2v4h4v2H4v-6Zm14 0h2v6h-6v-2h4v-4ZM9 9h6v6H9V9Z"></path></svg>',
        reset: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw-icon h-3.5 w-3.5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>'
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
