(function () {
    'use strict';

    var STORAGE_KEY = 'ksu-a11y-widget-settings';
    var STYLE_ID = 'ksu-a11y-widget-style';
    var ROOT_ID = 'ksu-a11y-widget-root';
    var READING_GUIDE_ID = 'ksu-a11y-reading-guide';
    var DEFAULT_LANG = 'en';
    var LANGUAGE_LABELS = {
        en: 'English',
        ar: 'Arabic',
        ur: 'Urdu'
    };

    var FONT_SCALES = [1, 1.1, 1.2, 1.3, 1.4];
    var FONT_WEIGHTS = [400, 500, 600, 700];
    var LINE_HEIGHTS = [1.5, 1.65, 1.8, 2.0];
    var LETTER_SPACING = ['normal', '0.02em', '0.05em', '0.08em'];
    var WORD_SPACING = ['normal', '0.1em', '0.2em', '0.35em'];
    var ZOOM_VALUES = [1, 1.1, 1.25, 1.5, 2];

    var MODE_KEYS = ['epilepsy', 'visuallyImpaired', 'cognitive', 'motorImpaired', 'colorblind', 'dyslexia', 'adhd', 'blindness'];

    var MODE_PRESETS = {
        epilepsy: { reduceMotion: true, lowSaturation: true },
        visuallyImpaired: { fontSizeStep: 2, zoomStep: 1, highContrast: true, bigCursor: true },
        cognitive: { hideImages: true, focusHighlight: true, readingGuide: true, lineHeightStep: 1 },
        motorImpaired: { focusHighlight: true, bigCursor: true },
        colorblind: { monochrome: true },
        dyslexia: { dyslexiaFont: true, letterSpacingStep: 1, wordSpacingStep: 1, lineHeightStep: 1 },
        adhd: { hideImages: true, reduceMotion: true, focusHighlight: true, lineHeightStep: 1 },
        blindness: { focusHighlight: true, bigCursor: true, fontSizeStep: 1, readSelectedText: true }
    };

    var DEFAULT_ICON_SET = {
        launcher: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="12" cy="8" r="1.5"></circle><path d="M10.5 11h1.5v5h1.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 0 0-9-9 9.7 9.7 0 0 0-6.7 2.7L3 8M3 3v5h5M3 12a9 9 0 0 0 9 9 9.7 9.7 0 0 0 6.7-2.7L21 16m-5 0h5v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        epilepsy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>',
        visuallyImpaired: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="none" stroke="currentColor" stroke-width="2"></path><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle></svg>',
        cognitive: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 22h4M15 14c.2-1 .7-1.8 1.5-2.5A5.5 5.5 0 0 0 18 8 6 6 0 1 0 6 8c0 1.3.5 2.6 1.5 3.5.8.7 1.3 1.5 1.5 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        motorImpaired: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 11V6a2 2 0 1 0-4 0v4M14 10V4a2 2 0 1 0-4 0v6.5M10 10.5V6a2 2 0 1 0-4 0v8l-1.8-1.8a2 2 0 1 0-2.8 2.8l3.6 3.6C6.5 20.1 8.2 21 11 21h2a8 8 0 0 0 8-8V8a2 2 0 1 0-4 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        colorblind: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2"></path><circle cx="8.5" cy="7.5" r="0.9"></circle><circle cx="6.5" cy="12.5" r="0.9"></circle><circle cx="13.5" cy="6.5" r="0.9"></circle><circle cx="17.5" cy="10.5" r="0.9"></circle></svg>',
        dyslexia: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7V4h16v3M12 4v16M9 20h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        adhd: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
        blindness: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7c2 0 3.8.6 5.3 1.5M22 12s-3.5 7-10 7c-2 0-3.8-.6-5.3-1.5M2 2l20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        fontSizeStep: '<svg data-v-6c57e751="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-horizontal-icon h-5 w-5"><path d="m18 8 4 4-4 4"></path><path d="M2 12h20"></path><path d="m6 8-4 4 4 4"></path></svg>',
        fontWeightStep: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h8a4 4 0 0 1 0 8H6V4Zm0 8h9a4 4 0 0 1 0 8H6v-8Z" fill="none" stroke="currentColor" stroke-width="2"></path></svg>',
        lineHeightStep: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        letterSpacingStep: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2v12H6zM16 6h2v12h-2zM9 18l3-12 3 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>',
        wordSpacingStep: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="17" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle><path d="M10 12h4" fill="none" stroke="currentColor" stroke-width="2"></path></svg>',
        textAlign: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h12M3 18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        dyslexiaFont: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M12 6v14M9 20h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        readSelectedText: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h3l4-4v12l-4-4H4zM16 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        zoomStep: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"></circle><path d="m21 21-4.3-4.3M11 8v6M8 11h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        highlightLinks: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        highlightHeadings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4v16M18 4v16M6 12h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        bigCursor: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4 19 10l-6 2-2 6L5 4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>',
        reduceMotion: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M2 2l20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        focusHighlight: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="12" cy="12" r="2"></circle><path d="M12 3v3M12 18v3M3 12h3M18 12h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        hideImages: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 5l18 14M21 5 3 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        readingGuide: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
        darkMode: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z" fill="none" stroke="currentColor" stroke-width="2"></path></svg>',
        highContrast: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle><path d="M12 2v20" fill="none" stroke="currentColor" stroke-width="2"></path></svg>',
        lowSaturation: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c3 4 7 7 7 11a7 7 0 1 1-14 0c0-4 4-7 7-11Z" fill="none" stroke="currentColor" stroke-width="2"></path></svg>',
        monochrome: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle><path d="M2 12h20" fill="none" stroke="currentColor" stroke-width="2"></path></svg>'
    };

    var defaultLocale = {
        title: 'Accessibility',
        open: 'Open accessibility options',
        close: 'Close accessibility panel',
        resetAll: 'Reset all',
        profiles: 'Profiles',
        text: 'Text',
        view: 'View',
        color: 'Color',
        epilepsy: 'Epilepsy safe',
        visuallyImpaired: 'Visually impaired',
        cognitive: 'Cognitive disability',
        motorImpaired: 'Motor impaired',
        colorblind: 'Colorblind',
        dyslexia: 'Dyslexia friendly',
        adhd: 'ADHD friendly',
        blindness: 'Blindness',
        fontSizeStep: 'Size',
        fontWeightStep: 'Weight',
        lineHeightStep: 'Lines',
        letterSpacingStep: 'Spacing',
        wordSpacingStep: 'Words',
        textAlign: 'Align',
        dyslexiaFont: 'Dyslexia Font',
        readSelectedText: 'Read Selected',
        zoomStep: 'Zoom',
        highlightLinks: 'Links',
        highlightHeadings: 'Headings',
        bigCursor: 'Cursor',
        reduceMotion: 'Motion',
        focusHighlight: 'Focus',
        hideImages: 'Images',
        readingGuide: 'Reading Guide',
        darkMode: 'Dark UI',
        highContrast: 'Contrast',
        lowSaturation: 'Saturation',
        monochrome: 'Mono',
        languageName: 'English',
        languageDir: 'ltr',
        languageIcon: '????',
        language: 'Language',
        auto: 'Auto',
        on: 'On',
        off: 'Off',
        play: 'Play',
        pause: 'Pause',
        resume: 'Resume',
        stop: 'Stop',
        stateSaved: 'Accessibility settings saved',
        panelOpened: 'Accessibility panel opened',
        panelClosed: 'Accessibility panel closed'
    };

    var locales = { en: defaultLocale };
    var queuedLocales = window.__KSU_A11Y_LOCALES__;
    if (queuedLocales && typeof queuedLocales === 'object') {
        for (var queuedLang in queuedLocales) {
            if (Object.prototype.hasOwnProperty.call(queuedLocales, queuedLang)) {
                locales[queuedLang] = mergeObjects(defaultLocale, queuedLocales[queuedLang]);
            }
        }
    }

    var activeIcons = mergeObjects(DEFAULT_ICON_SET, window.__KSU_A11Y_ICON_SET__ || {});

    var state = {
        fontSizeStep: 0,
        fontWeightStep: 0,
        lineHeightStep: 0,
        letterSpacingStep: 0,
        wordSpacingStep: 0,
        zoomStep: 0,
        highlightLinks: false,
        highlightHeadings: false,
        bigCursor: false,
        reduceMotion: false,
        focusHighlight: false,
        hideImages: false,
        readingGuide: false,
        textAlign: false,
        dyslexiaFont: false,
        readSelectedText: false,
        darkMode: false,
        highContrast: false,
        lowSaturation: false,
        monochrome: false,
        activeMode: null,
        lang: 'auto'
    };

    var dom = {
        host: null,
        panel: null,
        toggleButton: null,
        liveRegion: null,
        mounted: false,
        initialized: false,
        controls: {},
        profileButtons: {},
        languageButtons: {},
        languageMenu: null,
        languageMenuGrid: null,
        headerLanguageBtn: null,
        headerLanguageLabel: null,
        headerLanguageIcon: null
    };

    var uiDefinition = {
        text: [
            { key: 'fontSizeStep', kind: 'step', max: FONT_SCALES.length - 1 },
            { key: 'fontWeightStep', kind: 'step', max: FONT_WEIGHTS.length - 1 },
            { key: 'lineHeightStep', kind: 'step', max: LINE_HEIGHTS.length - 1 },
            { key: 'letterSpacingStep', kind: 'step', max: LETTER_SPACING.length - 1 },
            { key: 'wordSpacingStep', kind: 'step', max: WORD_SPACING.length - 1 },
            { key: 'textAlign', kind: 'toggle' },
            { key: 'dyslexiaFont', kind: 'toggle' },
            { key: 'readSelectedText', kind: 'toggle' }
        ],
        view: [
            { key: 'zoomStep', kind: 'step', max: ZOOM_VALUES.length - 1 },
            { key: 'highlightLinks', kind: 'toggle' },
            { key: 'highlightHeadings', kind: 'toggle' },
            { key: 'bigCursor', kind: 'toggle' },
            { key: 'reduceMotion', kind: 'toggle' },
            { key: 'focusHighlight', kind: 'toggle' },
            { key: 'hideImages', kind: 'toggle' },
            { key: 'readingGuide', kind: 'toggle' }
        ],
        color: [
            { key: 'darkMode', kind: 'toggle' },
            { key: 'highContrast', kind: 'toggle' },
            { key: 'lowSaturation', kind: 'toggle' },
            { key: 'monochrome', kind: 'toggle' }
        ]
    };

    var options = {
        position: 'right',
        zIndex: 2147483000,
        autoInjectCss: true,
        cssHref: '',
        lang: 'auto',
        remember: true,
        storageKey: STORAGE_KEY,
        icons: null
    };

    var speechBound = false;
    var speechToolbarBound = false;
    var speechToolbar = null;
    var speechSelectionText = '';
    var speechToolbarPlayBtn = null;
    var speechToolbarPauseBtn = null;
    var speechToolbarStopBtn = null;
    var speechToolbarMode = 'idle';
    var readingGuideBound = false;
    var dyslexiaFontInjected = false;

    function mergeObjects(base, extra) {
        var output = {};
        var key;
        for (key in base) {
            if (Object.prototype.hasOwnProperty.call(base, key)) {
                output[key] = base[key];
            }
        }
        if (extra && typeof extra === 'object') {
            for (key in extra) {
                if (Object.prototype.hasOwnProperty.call(extra, key)) {
                    output[key] = extra[key];
                }
            }
        }
        return output;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function resolveLocale(lang) {
        if (lang === 'auto') {
            lang = resolvePageLang();
        }
        if (locales[lang]) {
            return locales[lang];
        }
        var shortCode = String(lang || '').split('-')[0];
        return locales[shortCode] || locales.en;
    }

    function t(key) {
        var locale = resolveLocale(state.lang);
        return locale[key] || locales.en[key] || key;
    }

    function normalizeIconMarkup(markup) {
        if (typeof markup !== 'string') {
            return '';
        }
        var trimmed = markup.trim();
        return trimmed.indexOf('<svg') === 0 ? trimmed : '';
    }

    function resolvePageLang() {
        var lang = (document.documentElement.lang || document.documentElement.getAttribute('xml:lang') || '').trim().toLowerCase();
        if (!lang) {
            lang = (navigator.language || navigator.userLanguage || DEFAULT_LANG).toLowerCase();
        }
        return lang.split('-')[0] || DEFAULT_LANG;
    }

    function resolvePageDir() {
        var dir = (document.documentElement.dir || document.body.dir || 'ltr').trim().toLowerCase();
        return dir === 'rtl' ? 'rtl' : 'ltr';
    }

    function getLanguageDir(langKey) {
        if (langKey === 'auto') {
            return resolvePageDir();
        }
        var locale = locales[langKey];
        if (locale && (locale.languageDir === 'rtl' || locale.languageDir === 'ltr')) {
            return locale.languageDir;
        }
        return resolvePageDir();
    }

    function resolvePosition(position) {
        var pos = String(position || '').toLowerCase();
        if (pos === 'left' || pos === 'right') {
            return pos;
        }
        if (pos === 'start') {
            return resolvePageDir() === 'rtl' ? 'right' : 'left';
        }
        if (pos === 'end') {
            return resolvePageDir() === 'rtl' ? 'left' : 'right';
        }
        return 'right';
    }

    function getLanguageLabel(langKey) {
        if (langKey === 'auto') {
            return t('auto');
        }
        if (locales[langKey] && locales[langKey].languageName) {
            return locales[langKey].languageName;
        }
        return LANGUAGE_LABELS[langKey] || langKey.toUpperCase();
    }

    function getLanguageIcon(langKey) {
        if (langKey === 'auto') {
            return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 12h20M12 2v20M6 6l12 12M6 18l12-12" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
        }
        return (locales[langKey] && locales[langKey].languageIcon) || '';
    }

    function getAvailableLanguages() {
        return Object.keys(locales).sort();
    }

    function getEffectiveLang() {
        return state.lang === 'auto' ? resolvePageLang() : state.lang;
    }

    function getEffectiveDir() {
        return getLanguageDir(state.lang);
    }

    function getIconMarkup(iconKey) {
        return normalizeIconMarkup(activeIcons[iconKey] || DEFAULT_ICON_SET[iconKey] || '');
    }

    function setIcon(target, iconKey) {
        if (!target) {
            return;
        }
        target.innerHTML = getIconMarkup(iconKey);
    }

    function inferCssHref() {
        if (options.cssHref) {
            return options.cssHref;
        }
        var script = document.currentScript;
        if (script && script.src) {
            return script.src.replace(/accessibility-widget\.js(?:\?.*)?$/, 'accessibility-widget.css');
        }
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i -= 1) {
            var src = scripts[i].src || '';
            if (src.indexOf('accessibility-widget.js') !== -1) {
                return src.replace(/accessibility-widget\.js(?:\?.*)?$/, 'accessibility-widget.css');
            }
        }
        return '';
    }

    function injectCssIfNeeded() {
        if (!options.autoInjectCss || document.getElementById(STYLE_ID)) {
            return;
        }
        var href = inferCssHref();
        if (!href) {
            return;
        }
        var link = document.createElement('link');
        link.id = STYLE_ID;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    function loadState() {
        if (!options.remember) {
            return;
        }
        var raw;
        try {
            raw = window.localStorage.getItem(options.storageKey);
        } catch (error) {
            return;
        }
        if (!raw) {
            return;
        }
        try {
            var parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') {
                return;
            }
            state.fontSizeStep = typeof parsed.fontSizeStep === 'number' ? clamp(parsed.fontSizeStep, 0, FONT_SCALES.length - 1) : state.fontSizeStep;
            state.fontWeightStep = typeof parsed.fontWeightStep === 'number' ? clamp(parsed.fontWeightStep, 0, FONT_WEIGHTS.length - 1) : state.fontWeightStep;
            state.lineHeightStep = typeof parsed.lineHeightStep === 'number' ? clamp(parsed.lineHeightStep, 0, LINE_HEIGHTS.length - 1) : state.lineHeightStep;
            state.letterSpacingStep = typeof parsed.letterSpacingStep === 'number' ? clamp(parsed.letterSpacingStep, 0, LETTER_SPACING.length - 1) : state.letterSpacingStep;
            state.wordSpacingStep = typeof parsed.wordSpacingStep === 'number' ? clamp(parsed.wordSpacingStep, 0, WORD_SPACING.length - 1) : state.wordSpacingStep;
            state.zoomStep = typeof parsed.zoomStep === 'number' ? clamp(parsed.zoomStep, 0, ZOOM_VALUES.length - 1) : state.zoomStep;

            var boolKeys = ['highlightLinks', 'highlightHeadings', 'bigCursor', 'reduceMotion', 'focusHighlight', 'hideImages', 'readingGuide', 'textAlign', 'dyslexiaFont', 'readSelectedText', 'darkMode', 'highContrast', 'lowSaturation', 'monochrome'];
            for (var i = 0; i < boolKeys.length; i += 1) {
                if (typeof parsed[boolKeys[i]] === 'boolean') {
                    state[boolKeys[i]] = parsed[boolKeys[i]];
                }
            }
            if (typeof parsed.lang === 'string') {
                state.lang = parsed.lang;
            }
            if (typeof parsed.langMode === 'string' && parsed.langMode === 'auto') {
                state.lang = 'auto';
            }
            if (parsed.activeMode === null || MODE_PRESETS[parsed.activeMode]) {
                state.activeMode = parsed.activeMode;
            }
        } catch (error) {
            // Ignore invalid storage payload.
        }
    }

    function saveState() {
        if (!options.remember) {
            return;
        }
        try {
            window.localStorage.setItem(options.storageKey, JSON.stringify({
                fontSizeStep: state.fontSizeStep,
                fontWeightStep: state.fontWeightStep,
                lineHeightStep: state.lineHeightStep,
                letterSpacingStep: state.letterSpacingStep,
                wordSpacingStep: state.wordSpacingStep,
                zoomStep: state.zoomStep,
                highlightLinks: state.highlightLinks,
                highlightHeadings: state.highlightHeadings,
                bigCursor: state.bigCursor,
                reduceMotion: state.reduceMotion,
                focusHighlight: state.focusHighlight,
                hideImages: state.hideImages,
                readingGuide: state.readingGuide,
                textAlign: state.textAlign,
                dyslexiaFont: state.dyslexiaFont,
                readSelectedText: state.readSelectedText,
                darkMode: state.darkMode,
                highContrast: state.highContrast,
                lowSaturation: state.lowSaturation,
                monochrome: state.monochrome,
                activeMode: state.activeMode,
                lang: state.lang,
                langMode: state.lang === 'auto' ? 'auto' : 'manual'
            }));
        } catch (error) {
            // Ignore unavailable storage.
        }
    }

    function announce(message) {
        if (!dom.liveRegion) {
            return;
        }
        dom.liveRegion.textContent = '';
        window.setTimeout(function () {
            dom.liveRegion.textContent = message;
        }, 10);
    }

    function applyDyslexiaFont() {
        if (!state.dyslexiaFont || dyslexiaFontInjected) {
            return;
        }
        var link = document.createElement('link');
        link.id = 'ksu-a11y-dyslexia-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
        document.head.appendChild(link);
        dyslexiaFontInjected = true;
    }

    function hideSpeechToolbar() {
        if (!speechToolbar) {
            return;
        }
        speechToolbar.hidden = true;
        speechSelectionText = '';
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        speechToolbarMode = 'idle';
    }

    function setSpeechToolbarMode(mode) {
        speechToolbarMode = mode;
        if (!speechToolbarPlayBtn || !speechToolbarPauseBtn || !speechToolbarStopBtn) {
            return;
        }
        var isPlaying = mode === 'playing' || mode === 'paused';
        speechToolbarPlayBtn.hidden = isPlaying;
        speechToolbarPauseBtn.hidden = !isPlaying;
        speechToolbarStopBtn.hidden = !isPlaying;
    }

    function refreshSpeechToolbarA11yLabels() {
        if (!speechToolbarPlayBtn || !speechToolbarPauseBtn || !speechToolbarStopBtn) {
            return;
        }
        var pauseLabel = speechToolbarMode === 'paused' ? t('resume') : t('pause');
        speechToolbarPlayBtn.setAttribute('aria-label', t('play'));
        speechToolbarPlayBtn.setAttribute('title', t('play'));
        speechToolbarPauseBtn.setAttribute('aria-label', pauseLabel);
        speechToolbarPauseBtn.setAttribute('title', pauseLabel);
        speechToolbarStopBtn.setAttribute('aria-label', t('stop'));
        speechToolbarStopBtn.setAttribute('title', t('stop'));
    }

    function updateSpeechToolbarState() {
        if (!speechToolbar || !window.speechSynthesis) {
            return;
        }
        if (!window.speechSynthesis.speaking) {
            setSpeechToolbarMode('idle');
            refreshSpeechToolbarA11yLabels();
            return;
        }
        setSpeechToolbarMode(window.speechSynthesis.paused ? 'paused' : 'playing');
        refreshSpeechToolbarA11yLabels();
    }

    function ensureSpeechToolbarElement() {
        if (speechToolbar) {
            return speechToolbar;
        }
        var toolbar = document.createElement('div');
        toolbar.className = 'ksu-a11y-speech-toolbar';
        toolbar.hidden = true;

        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'ksu-a11y-speech-toolbar-btn';
        playBtn.dataset.action = 'play';
        setIcon(playBtn, 'speechPlay');

        var pauseBtn = document.createElement('button');
        pauseBtn.type = 'button';
        pauseBtn.className = 'ksu-a11y-speech-toolbar-btn';
        pauseBtn.dataset.action = 'pause';
        setIcon(pauseBtn, 'speechPause');

        var stopBtn = document.createElement('button');
        stopBtn.type = 'button';
        stopBtn.className = 'ksu-a11y-speech-toolbar-btn';
        stopBtn.dataset.action = 'stop';
        setIcon(stopBtn, 'speechStop');

        playBtn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!speechSelectionText || !window.speechSynthesis) {
                return;
            }
            try {
                window.speechSynthesis.cancel();
                var utterance = new window.SpeechSynthesisUtterance(speechSelectionText);
                var effectiveLang = getEffectiveLang();
                utterance.lang = effectiveLang === 'ar' ? 'ar-SA' : effectiveLang === 'ur' ? 'ur-PK' : 'en-US';
                utterance.rate = 1;
                utterance.onstart = function () {
                    setSpeechToolbarMode('playing');
                    updateSpeechToolbarState();
                };
                utterance.onend = function () {
                    setSpeechToolbarMode('idle');
                    updateSpeechToolbarState();
                };
                utterance.onerror = function () {
                    setSpeechToolbarMode('idle');
                    updateSpeechToolbarState();
                };
                setSpeechToolbarMode('playing');
                window.speechSynthesis.speak(utterance);
                updateSpeechToolbarState();
            } catch (error) {
                // Ignore speech synthesis errors.
            }
        });

        pauseBtn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
                return;
            }
            try {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                    setSpeechToolbarMode('playing');
                } else {
                    window.speechSynthesis.pause();
                    setSpeechToolbarMode('paused');
                }
                updateSpeechToolbarState();
            } catch (error) {
                // Ignore speech synthesis errors.
            }
        });

        stopBtn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!window.speechSynthesis) {
                return;
            }
            try {
                window.speechSynthesis.cancel();
                setSpeechToolbarMode('idle');
                updateSpeechToolbarState();
            } catch (error) {
                // Ignore speech synthesis errors.
            }
        });

        toolbar.appendChild(playBtn);
        toolbar.appendChild(pauseBtn);
        toolbar.appendChild(stopBtn);
        document.body.appendChild(toolbar);
        speechToolbar = toolbar;
        speechToolbarPlayBtn = playBtn;
        speechToolbarPauseBtn = pauseBtn;
        speechToolbarStopBtn = stopBtn;
        setSpeechToolbarMode('idle');
        refreshSpeechToolbarA11yLabels();
        return toolbar;
    }

    function positionSpeechToolbar(selection) {
        if (!selection || !selection.rangeCount || !speechToolbar) {
            return;
        }
        var rect = selection.getRangeAt(0).getBoundingClientRect();
        if (!rect || (!rect.width && !rect.height)) {
            return;
        }
        var top = rect.top - 44;
        if (top < 8) {
            top = rect.bottom + 8;
        }
        speechToolbar.style.top = String(top) + 'px';
        speechToolbar.style.left = String(rect.left + rect.width / 2) + 'px';
    }

    function handleReadSelectedText() {
        if (!state.readSelectedText || !window.getSelection || !window.speechSynthesis) {
            hideSpeechToolbar();
            return;
        }
        var selection = window.getSelection();
        var text = String(selection.toString() || '').trim();
        if (!text) {
            hideSpeechToolbar();
            return;
        }
        if (speechSelectionText && speechSelectionText !== text && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        speechSelectionText = text;
        ensureSpeechToolbarElement();
        positionSpeechToolbar(selection);
        setSpeechToolbarMode('idle');
        speechToolbar.hidden = false;
        updateSpeechToolbarState();
    }

    function bindSpeechEventsIfNeeded() {
        if (speechBound) {
            return;
        }
        document.addEventListener('mouseup', handleReadSelectedText);
        document.addEventListener('keyup', handleReadSelectedText);
        speechBound = true;

        if (speechToolbarBound) {
            return;
        }
        document.addEventListener('mousedown', function (event) {
            if (!speechToolbar || speechToolbar.hidden) {
                return;
            }
            if (speechToolbar.contains(event.target)) {
                return;
            }
            var activeSelection = window.getSelection ? String(window.getSelection().toString() || '').trim() : '';
            if (!activeSelection) {
                hideSpeechToolbar();
            }
        });
        document.addEventListener('selectionchange', function () {
            if (!state.readSelectedText) {
                return;
            }
            var activeSelection = window.getSelection ? String(window.getSelection().toString() || '').trim() : '';
            if (!activeSelection) {
                hideSpeechToolbar();
            }
        });
        speechToolbarBound = true;
    }

    function ensureReadingGuideElement() {
        var guide = document.getElementById(READING_GUIDE_ID);
        if (!guide) {
            guide = document.createElement('div');
            guide.id = READING_GUIDE_ID;
            guide.className = 'ksu-a11y-reading-guide';
            guide.style.top = '-120px';
            document.body.appendChild(guide);
        }
        return guide;
    }

    function bindReadingGuideIfNeeded() {
        if (readingGuideBound) {
            return;
        }
        document.addEventListener('mousemove', function (event) {
            if (!state.readingGuide) {
                return;
            }
            var guide = ensureReadingGuideElement();
            guide.style.top = String(event.clientY - 18) + 'px';
        });
        readingGuideBound = true;
    }

    function updateRootClasses() {
        var root = document.documentElement;
        var effectiveDir = getEffectiveDir();

        root.classList.toggle('ksu-a11y-highlight-links', state.highlightLinks);
        root.classList.toggle('ksu-a11y-highlight-headings', state.highlightHeadings);
        root.classList.toggle('ksu-a11y-big-cursor', state.bigCursor);
        root.classList.toggle('ksu-a11y-reduce-motion', state.reduceMotion);
        root.classList.toggle('ksu-a11y-focus-highlight', state.focusHighlight);
        root.classList.toggle('ksu-a11y-hide-images', state.hideImages);
        root.classList.toggle('ksu-a11y-reading-guide-enabled', state.readingGuide);
        root.classList.toggle('ksu-a11y-text-align', state.textAlign);
        root.classList.toggle('ksu-a11y-dyslexia-font', state.dyslexiaFont);
        root.classList.toggle('ksu-a11y-high-contrast', state.highContrast);
        root.classList.toggle('ksu-a11y-low-saturation', state.lowSaturation);
        root.classList.toggle('ksu-a11y-monochrome', state.monochrome);

        root.style.setProperty('--ksu-a11y-font-scale', String(FONT_SCALES[state.fontSizeStep]));
        root.style.setProperty('--ksu-a11y-font-weight', String(FONT_WEIGHTS[state.fontWeightStep]));
        root.style.setProperty('--ksu-a11y-line-height', String(LINE_HEIGHTS[state.lineHeightStep]));
        root.style.setProperty('--ksu-a11y-letter-spacing', String(LETTER_SPACING[state.letterSpacingStep]));
        root.style.setProperty('--ksu-a11y-word-spacing', String(WORD_SPACING[state.wordSpacingStep]));

        try {
            root.style.zoom = String(ZOOM_VALUES[state.zoomStep]);
        } catch (error) {
            root.style.transform = state.zoomStep > 0 ? 'scale(' + ZOOM_VALUES[state.zoomStep] + ')' : '';
            root.style.transformOrigin = 'top left';
        }

        if (dom.host) {
            dom.host.classList.toggle('ksu-a11y-theme-dark', state.darkMode);
            dom.host.dataset.dir = effectiveDir;
            dom.host.setAttribute('dir', effectiveDir);
            dom.host.dataset.position = resolvePosition(options.position);
        }
        if (dom.panel) {
            dom.panel.setAttribute('dir', effectiveDir);
        }
        if (dom.languageMenu) {
            dom.languageMenu.setAttribute('dir', effectiveDir);
        }

        applyDyslexiaFont();
        bindSpeechEventsIfNeeded();
        bindReadingGuideIfNeeded();

        if (!state.readSelectedText) {
            hideSpeechToolbar();
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        }

        var guide = ensureReadingGuideElement();
        guide.style.display = state.readingGuide ? 'block' : 'none';
    }

    function setProfileMode(modeKey) {
        var isActive = state.activeMode === modeKey;
        resetState(false);
        if (!isActive && MODE_PRESETS[modeKey]) {
            var preset = MODE_PRESETS[modeKey];
            for (var key in preset) {
                if (Object.prototype.hasOwnProperty.call(preset, key)) {
                    state[key] = preset[key];
                }
            }
            state.activeMode = modeKey;
        } else {
            state.activeMode = null;
        }
        apply(true);
    }

    function resetState(includeApply) {
        state.fontSizeStep = 0;
        state.fontWeightStep = 0;
        state.lineHeightStep = 0;
        state.letterSpacingStep = 0;
        state.wordSpacingStep = 0;
        state.zoomStep = 0;
        state.highlightLinks = false;
        state.highlightHeadings = false;
        state.bigCursor = false;
        state.reduceMotion = false;
        state.focusHighlight = false;
        state.hideImages = false;
        state.readingGuide = false;
        state.textAlign = false;
        state.dyslexiaFont = false;
        state.readSelectedText = false;
        state.darkMode = false;
        state.highContrast = false;
        state.lowSaturation = false;
        state.monochrome = false;
        state.activeMode = null;
        if (includeApply !== false) {
            apply(true);
        }
    }

    function createFeatureButton(config) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'ksu-a11y-btn';
        button.dataset.key = config.key;
        button.setAttribute('title', t(config.key));

        var icon = document.createElement('span');
        icon.className = 'ksu-a11y-btn-icon';
        icon.setAttribute('aria-hidden', 'true');
        setIcon(icon, config.key);

        var label = document.createElement('span');
        label.className = 'ksu-a11y-btn-label';
        label.textContent = t(config.key);

        button.appendChild(icon);
        button.appendChild(label);

        if (config.kind === 'step') {
            var dots = document.createElement('span');
            dots.className = 'ksu-a11y-dots';
            for (var i = 0; i < config.max; i += 1) {
                var dot = document.createElement('span');
                dot.className = 'ksu-a11y-dot';
                dots.appendChild(dot);
            }
            button.appendChild(dots);
        }

        button.addEventListener('click', function () {
            if (config.kind === 'step') {
                state[config.key] = state[config.key] >= config.max ? 0 : state[config.key] + 1;
            } else {
                state[config.key] = !state[config.key];
            }
            state.activeMode = null;
            apply(true);
        });

        dom.controls[config.key] = { button: button, config: config, icon: icon, label: label };
        return button;
    }

    function createProfileButton(modeKey) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'ksu-a11y-profile-btn';
        button.dataset.mode = modeKey;
        button.setAttribute('title', t(modeKey));

        var icon = document.createElement('span');
        icon.className = 'ksu-a11y-profile-icon';
        icon.setAttribute('aria-hidden', 'true');
        setIcon(icon, modeKey);

        var label = document.createElement('span');
        label.className = 'ksu-a11y-profile-label';
        label.textContent = t(modeKey);

        button.appendChild(icon);
        button.appendChild(label);
        button.addEventListener('click', function () {
            setProfileMode(modeKey);
        });

        dom.profileButtons[modeKey] = { button: button, icon: icon, label: label };
        return button;
    }

    function createLanguageButton(langKey) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'ksu-a11y-profile-btn ksu-a11y-language-option';
        button.dataset.lang = langKey;
        button.setAttribute('title', getLanguageLabel(langKey));

        var icon = document.createElement('span');
        icon.className = 'ksu-a11y-language-icon';
        icon.innerHTML = getLanguageIcon(langKey);

        var label = document.createElement('span');
        label.className = 'ksu-a11y-profile-label';
        label.textContent = getLanguageLabel(langKey);

        button.appendChild(icon);
        button.appendChild(label);
        button.addEventListener('click', function () {
            setLanguage(langKey);
            closeLanguageMenu();
        });

        dom.languageButtons[langKey] = { button: button, icon: icon, label: label };
        return button;
    }

    function toggleLanguageMenu() {
        if (!dom.languageMenu || !dom.headerLanguageBtn) {
            return;
        }
        var isOpen = !dom.languageMenu.hidden;
        dom.languageMenu.hidden = isOpen;
        dom.headerLanguageBtn.setAttribute('aria-expanded', (!isOpen).toString());
    }

    function closeLanguageMenu() {
        if (!dom.languageMenu) {
            return;
        }
        if (!dom.languageMenu.hidden) {
            dom.languageMenu.hidden = true;
        }
        if (dom.headerLanguageBtn) {
            dom.headerLanguageBtn.setAttribute('aria-expanded', 'false');
        }
    }

    function addSectionTitle(parent, key) {
        var title = document.createElement('p');
        title.className = 'ksu-a11y-section-title';
        title.dataset.i18n = key;
        title.textContent = t(key);
        parent.appendChild(title);
        return title;
    }

    function closePanel() {
        if (!dom.panel || !dom.toggleButton) {
            return;
        }
        dom.panel.hidden = true;
        closeLanguageMenu();
        dom.toggleButton.style.display = '';
        dom.toggleButton.setAttribute('aria-expanded', 'false');
        dom.toggleButton.focus();
        announce(t('panelClosed'));
    }

    function openPanel() {
        if (!dom.panel || !dom.toggleButton) {
            return;
        }
        dom.panel.hidden = false;
        dom.toggleButton.style.display = 'none';
        dom.toggleButton.setAttribute('aria-expanded', 'true');
        dom.panel.focus();
        announce(t('panelOpened'));
    }

    function buildPanel() {
        var panel = document.createElement('section');
        panel.className = 'ksu-a11y-panel';
        panel.hidden = true;
        panel.tabIndex = -1;
        panel.id = 'ksu-a11y-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', t('title'));

        var header = document.createElement('div');
        header.className = 'ksu-a11y-panel-header';

        var title = document.createElement('span');
        title.className = 'ksu-a11y-panel-title';
        title.textContent = t('title');

        var headerActions = document.createElement('div');
        headerActions.className = 'ksu-a11y-header-actions';

        var headerReset = document.createElement('button');
        headerReset.type = 'button';
        headerReset.className = 'ksu-a11y-header-icon-btn';
        headerReset.setAttribute('title', t('resetAll'));
        var headerResetIcon = document.createElement('span');
        headerResetIcon.className = 'ksu-a11y-icon';
        setIcon(headerResetIcon, 'reset');
        headerReset.appendChild(headerResetIcon);
        headerReset.addEventListener('click', function () {
            resetState(true);
        });

        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'ksu-a11y-header-icon-btn';
        closeBtn.setAttribute('title', t('close'));
        var closeIcon = document.createElement('span');
        closeIcon.className = 'ksu-a11y-icon';
        setIcon(closeIcon, 'close');
        closeBtn.appendChild(closeIcon);
        closeBtn.addEventListener('click', closePanel);

        headerActions.appendChild(headerReset);
        headerActions.appendChild(closeBtn);

        var languageBtn = document.createElement('button');
        languageBtn.type = 'button';
        languageBtn.className = 'ksu-a11y-header-language-btn';
        languageBtn.setAttribute('title', t('language'));
        languageBtn.setAttribute('aria-expanded', 'false');

        var languageBtnIcon = document.createElement('span');
        languageBtnIcon.className = 'ksu-a11y-language-icon';
        languageBtnIcon.innerHTML = getLanguageIcon(state.lang);

        var languageBtnLabel = document.createElement('span');
        languageBtnLabel.className = 'ksu-a11y-header-language-label';
        languageBtnLabel.textContent = getLanguageLabel(state.lang);

        var languageBtnArrow = document.createElement('span');
        languageBtnArrow.className = 'ksu-a11y-header-language-chevron';
        languageBtnArrow.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

        languageBtn.appendChild(languageBtnIcon);
        languageBtn.appendChild(languageBtnLabel);
        languageBtn.appendChild(languageBtnArrow);
        languageBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleLanguageMenu();
        });

        header.appendChild(headerActions);
        header.appendChild(languageBtn);
        header.appendChild(title);

        var languageMenu = document.createElement('div');
        languageMenu.className = 'ksu-a11y-language-dropdown';
        languageMenu.hidden = true;

        var languageMenuGrid = document.createElement('div');
        languageMenuGrid.className = 'ksu-a11y-profile-grid ksu-a11y-language-menu-grid';
        var languageKeys = ['auto'].concat(getAvailableLanguages());
        for (var l = 0; l < languageKeys.length; l += 1) {
            languageMenuGrid.appendChild(createLanguageButton(languageKeys[l]));
        }
        languageMenu.appendChild(languageMenuGrid);
        header.appendChild(languageMenu);

        dom.languageMenu = languageMenu;
        dom.languageMenuGrid = languageMenuGrid;
        dom.headerLanguageBtn = languageBtn;
        dom.headerLanguageLabel = languageBtnLabel;
        dom.headerLanguageIcon = languageBtnIcon;

        var body = document.createElement('div');
        body.className = 'ksu-a11y-body';

        var profilesWrap = document.createElement('div');
        addSectionTitle(profilesWrap, 'profiles');
        var profilesGrid = document.createElement('div');
        profilesGrid.className = 'ksu-a11y-profile-grid';
        for (var i = 0; i < MODE_KEYS.length; i += 1) {
            profilesGrid.appendChild(createProfileButton(MODE_KEYS[i]));
        }
        profilesWrap.appendChild(profilesGrid);
        body.appendChild(profilesWrap);

        var groups = ['text', 'view', 'color'];
        for (var g = 0; g < groups.length; g += 1) {
            var groupWrap = document.createElement('div');
            addSectionTitle(groupWrap, groups[g]);
            var grid = document.createElement('div');
            grid.className = 'ksu-a11y-grid';
            var items = uiDefinition[groups[g]];
            for (var p = 0; p < items.length; p += 1) {
                grid.appendChild(createFeatureButton(items[p]));
            }
            groupWrap.appendChild(grid);
            body.appendChild(groupWrap);
        }

        var resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'ksu-a11y-reset-btn';
        var resetIcon = document.createElement('span');
        resetIcon.className = 'ksu-a11y-icon';
        setIcon(resetIcon, 'reset');
        var resetLabel = document.createElement('span');
        resetLabel.className = 'ksu-a11y-reset-label';
        resetLabel.textContent = t('resetAll');
        resetBtn.appendChild(resetIcon);
        resetBtn.appendChild(resetLabel);
        resetBtn.addEventListener('click', function () {
            resetState(true);
        });

        panel.appendChild(header);
        panel.appendChild(body);

        var footer = document.createElement('div');
        footer.className = 'ksu-a11y-panel-footer';
        footer.appendChild(resetBtn);
        panel.appendChild(footer);

        dom.controls.headerTitle = title;
        dom.controls.headerReset = headerReset;
        dom.controls.headerClose = closeBtn;
        dom.controls.headerResetIcon = headerResetIcon;
        dom.controls.headerCloseIcon = closeIcon;
        dom.controls.bottomReset = resetBtn;
        dom.controls.bottomResetIcon = resetIcon;
        dom.controls.bottomResetLabel = resetLabel;

        return panel;
    }

    function render() {
        if (dom.mounted) {
            return;
        }

        var host = document.createElement('section');
        host.id = ROOT_ID;
        host.className = 'ksu-a11y-widget';
        host.dataset.position = resolvePosition(options.position);
        host.style.zIndex = String(options.zIndex);

        var liveRegion = document.createElement('div');
        liveRegion.className = 'ksu-a11y-live';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');

        var toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'ksu-a11y-launcher';
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-controls', 'ksu-a11y-panel');
        toggleButton.setAttribute('aria-label', t('open'));

        var launcherIcon = document.createElement('span');
        launcherIcon.className = 'ksu-a11y-launcher-icon';
        setIcon(launcherIcon, 'launcher');
        var launcherLabel = document.createElement('span');
        launcherLabel.className = 'ksu-a11y-launcher-label';
        launcherLabel.textContent = t('title');

        toggleButton.appendChild(launcherIcon);
        // toggleButton.appendChild(launcherLabel);
        toggleButton.addEventListener('click', function () {
            if (dom.panel.hidden) {
                openPanel();
            } else {
                closePanel();
            }
        });

        var panel = buildPanel();

        host.appendChild(liveRegion);
        host.appendChild(toggleButton);
        host.appendChild(panel);
        document.body.appendChild(host);

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && dom.panel && !dom.panel.hidden) {
                closePanel();
            }
        });

        dom.host = host;
        dom.panel = panel;
        dom.toggleButton = toggleButton;
        dom.liveRegion = liveRegion;
        dom.controls.launcherIcon = launcherIcon;
        dom.controls.launcherLabel = launcherLabel;
        dom.mounted = true;
    }

    function refreshLabels() {
        if (!dom.controls.launcherLabel) {
            return;
        }

        dom.toggleButton.setAttribute('aria-label', t('open'));
        dom.controls.launcherLabel.textContent = t('title');
        dom.panel.setAttribute('aria-label', t('title'));

        dom.controls.headerTitle.textContent = t('title');
        dom.controls.headerReset.setAttribute('title', t('resetAll'));
        dom.controls.headerClose.setAttribute('title', t('close'));
        dom.controls.bottomReset.setAttribute('title', t('resetAll'));
        dom.controls.bottomResetLabel.textContent = t('resetAll');

        var sectionTitles = dom.panel.querySelectorAll('.ksu-a11y-section-title');
        for (var i = 0; i < sectionTitles.length; i += 1) {
            var sectionKey = sectionTitles[i].getAttribute('data-i18n');
            sectionTitles[i].textContent = t(sectionKey);
        }

        for (var key in dom.controls) {
            if (!Object.prototype.hasOwnProperty.call(dom.controls, key)) {
                continue;
            }
            if (!dom.controls[key] || !dom.controls[key].button) {
                continue;
            }
            dom.controls[key].label.textContent = t(key);
            dom.controls[key].button.setAttribute('title', t(key));
        }

        for (var modeKey in dom.profileButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.profileButtons, modeKey)) {
                dom.profileButtons[modeKey].label.textContent = t(modeKey);
                dom.profileButtons[modeKey].button.setAttribute('title', t(modeKey));
            }
        }
        for (var langKey in dom.languageButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.languageButtons, langKey)) {
                dom.languageButtons[langKey].label.textContent = getLanguageLabel(langKey);
                dom.languageButtons[langKey].button.setAttribute('title', getLanguageLabel(langKey));
                if (dom.languageButtons[langKey].icon) {
                    dom.languageButtons[langKey].icon.innerHTML = getLanguageIcon(langKey);
                }
            }
        }
        if (dom.headerLanguageBtn) {
            dom.headerLanguageBtn.setAttribute('title', getLanguageLabel(state.lang));
        }
        if (dom.headerLanguageLabel) {
            dom.headerLanguageLabel.textContent = getLanguageLabel(state.lang);
        }
        if (dom.headerLanguageIcon) {
            dom.headerLanguageIcon.innerHTML = getLanguageIcon(state.lang);
        }
        if (speechToolbar) {
            if (speechToolbarPlayBtn) {
                setIcon(speechToolbarPlayBtn, 'speechPlay');
            }
            if (speechToolbarPauseBtn) {
                setIcon(speechToolbarPauseBtn, 'speechPause');
            }
            if (speechToolbarStopBtn) {
                setIcon(speechToolbarStopBtn, 'speechStop');
            }
            refreshSpeechToolbarA11yLabels();
        }
    }

    function refreshIcons() {
        if (!dom.controls.launcherIcon) {
            return;
        }

        setIcon(dom.controls.launcherIcon, 'launcher');
        setIcon(dom.controls.headerResetIcon, 'reset');
        setIcon(dom.controls.headerCloseIcon, 'close');
        setIcon(dom.controls.bottomResetIcon, 'reset');

        for (var key in dom.controls) {
            if (Object.prototype.hasOwnProperty.call(dom.controls, key) && dom.controls[key] && dom.controls[key].icon) {
                setIcon(dom.controls[key].icon, key);
            }
        }
        for (var modeKey in dom.profileButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.profileButtons, modeKey)) {
                setIcon(dom.profileButtons[modeKey].icon, modeKey);
            }
        }
        for (var langKey in dom.languageButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.languageButtons, langKey) && dom.languageButtons[langKey].icon) {
                dom.languageButtons[langKey].icon.innerHTML = getLanguageIcon(langKey);
            }
        }
    }

    function refreshStates() {
        for (var key in dom.controls) {
            if (!Object.prototype.hasOwnProperty.call(dom.controls, key)) {
                continue;
            }
            var control = dom.controls[key];
            if (!control || !control.button || !control.config) {
                continue;
            }
            var button = control.button;
            if (control.config.kind === 'step') {
                button.setAttribute('aria-pressed', 'true');
                button.dataset.step = String(state[key]);
                var dots = button.querySelectorAll('.ksu-a11y-dot');
                for (var d = 0; d < dots.length; d += 1) {
                    dots[d].classList.toggle('is-active', d < state[key]);
                }
                button.classList.toggle('is-active', state[key] > 0);
            } else {
                button.setAttribute('aria-pressed', state[key] ? 'true' : 'false');
                button.classList.toggle('is-active', state[key]);
            }
        }

        for (var modeKey in dom.profileButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.profileButtons, modeKey)) {
                dom.profileButtons[modeKey].button.classList.toggle('is-active', state.activeMode === modeKey);
            }
        }
        for (var langKey in dom.languageButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.languageButtons, langKey)) {
                var isActive = langKey === 'auto' ? state.lang === 'auto' : state.lang === langKey;
                dom.languageButtons[langKey].button.classList.toggle('is-active', isActive);
                dom.languageButtons[langKey].button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            }
        }
    }

    function apply(shouldPersist) {
        updateRootClasses();
        refreshLabels();
        refreshIcons();
        refreshStates();
        if (shouldPersist) {
            saveState();
            announce(t('stateSaved'));
        }
    }

    function registerLocale(lang, dictionary) {
        if (!lang || typeof lang !== 'string' || !dictionary || typeof dictionary !== 'object') {
            return;
        }
        locales[lang] = mergeObjects(defaultLocale, dictionary);
        if (dom.initialized) {
            if (dom.languageMenuGrid && !dom.languageButtons[lang]) {
                dom.languageMenuGrid.appendChild(createLanguageButton(lang));
            }
            apply(false);
        }
    }

    function setLanguage(lang) {
        if (!lang || typeof lang !== 'string') {
            return;
        }
        state.lang = lang;
        closeLanguageMenu();
        if (dom.initialized) {
            apply(true);
        }
    }

    function registerIcons(iconMap) {
        if (!iconMap || typeof iconMap !== 'object') {
            return;
        }
        activeIcons = mergeObjects(activeIcons, iconMap);
        if (dom.initialized) {
            refreshIcons();
        }
    }

    function getState() {
        return mergeObjects({}, state);
    }

    function init(userOptions) {
        if (dom.initialized || typeof window === 'undefined' || typeof document === 'undefined') {
            return api;
        }
        options = mergeObjects(options, userOptions || {});

        if (options.icons && typeof options.icons === 'object') {
            activeIcons = mergeObjects(activeIcons, options.icons);
        }
        if (typeof options.lang === 'string' && options.lang) {
            state.lang = options.lang;
        }

        injectCssIfNeeded();
        loadState();
        render();
        apply(false);
        dom.initialized = true;
        return api;
    }

    function destroy() {
        if (!dom.mounted || !dom.host) {
            return;
        }
        var root = document.documentElement;
        root.style.zoom = '';
        root.style.transform = '';
        root.style.transformOrigin = '';
        root.className = root.className
            .replace(/\bksu-a11y-[\w-]+\b/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();

        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        var guide = document.getElementById(READING_GUIDE_ID);
        if (guide && guide.parentNode) {
            guide.parentNode.removeChild(guide);
        }
        if (speechToolbar && speechToolbar.parentNode) {
            speechToolbar.parentNode.removeChild(speechToolbar);
        }
        speechToolbar = null;
        speechSelectionText = '';
        speechToolbarPlayBtn = null;
        speechToolbarPauseBtn = null;
        speechToolbarStopBtn = null;
        speechToolbarMode = 'idle';

        dom.host.parentNode.removeChild(dom.host);
        dom.host = null;
        dom.panel = null;
        dom.toggleButton = null;
        dom.liveRegion = null;
        dom.controls = {};
        dom.profileButtons = {};
        dom.mounted = false;
        dom.initialized = false;
    }

    var api = {
        init: init,
        destroy: destroy,
        setLanguage: setLanguage,
        registerLocale: registerLocale,
        registerIcons: registerIcons,
        getState: getState,
        apply: function () { apply(true); },
        setMode: setProfileMode,
        reset: function () { resetState(true); }
    };

    window.KsuAccessibilityWidgetV1 = api;
    if (!window.KsuAccessibilityWidget) {
        window.KsuAccessibilityWidget = api;
    }

    var currentScript = document.currentScript;
    var disableAuto = currentScript && currentScript.getAttribute('data-auto-init') === 'false';
    if (!disableAuto) {
        init({
            position: (currentScript && currentScript.getAttribute('data-position')) || 'right',
            lang: (currentScript && currentScript.getAttribute('data-lang')) || 'auto',
            cssHref: (currentScript && currentScript.getAttribute('data-css-href')) || '',
            autoInjectCss: !(currentScript && currentScript.getAttribute('data-auto-css') === 'false')
        });
    }
})();

