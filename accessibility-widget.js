(function () {
    'use strict';

    var STORAGE_KEY = 'ksu-a11y-widget-settings';
    var STYLE_ID = 'ksu-a11y-widget-style';
    var ROOT_ID = 'ksu-a11y-widget-root';
    var READING_GUIDE_ID = 'ksu-a11y-reading-guide';
    var DEFAULT_LANG = 'en';

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
        fontSizeStep: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h2l1-3h4l1 3h2L10 5H8L4 19Zm11-8V9h7v2h-2.5v8h-2V11H15Z"></path></svg>',
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
        on: 'On',
        off: 'Off',
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
        lang: DEFAULT_LANG
    };

    var dom = {
        host: null,
        panel: null,
        toggleButton: null,
        liveRegion: null,
        mounted: false,
        initialized: false,
        controls: {},
        profileButtons: {}
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
        lang: DEFAULT_LANG,
        remember: true,
        storageKey: STORAGE_KEY,
        icons: null
    };

    var speechBound = false;
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
                lang: state.lang
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

    function handleReadSelectedText() {
        if (!state.readSelectedText || !window.getSelection || !window.speechSynthesis) {
            return;
        }
        var text = String(window.getSelection().toString() || '').trim();
        if (!text) {
            return;
        }
        try {
            window.speechSynthesis.cancel();
            var utterance = new window.SpeechSynthesisUtterance(text);
            utterance.lang = state.lang === 'ar' ? 'ar-SA' : 'en-US';
            utterance.rate = 1;
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            // Ignore speech synthesis errors.
        }
    }

    function bindSpeechEventsIfNeeded() {
        if (speechBound) {
            return;
        }
        document.addEventListener('mouseup', handleReadSelectedText);
        speechBound = true;
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
        }

        applyDyslexiaFont();
        bindSpeechEventsIfNeeded();
        bindReadingGuideIfNeeded();

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
        header.appendChild(title);
        header.appendChild(headerActions);

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

        body.appendChild(resetBtn);

        panel.appendChild(header);
        panel.appendChild(body);

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
        host.dataset.position = options.position === 'left' ? 'left' : 'right';
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
        if (state.lang === lang && dom.initialized) {
            apply(false);
        }
    }

    function setLanguage(lang) {
        if (!lang || typeof lang !== 'string') {
            return;
        }
        state.lang = lang;
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
            position: currentScript && currentScript.getAttribute('data-position') === 'left' ? 'left' : 'right',
            lang: (currentScript && currentScript.getAttribute('data-lang')) || DEFAULT_LANG,
            cssHref: (currentScript && currentScript.getAttribute('data-css-href')) || '',
            autoInjectCss: !(currentScript && currentScript.getAttribute('data-auto-css') === 'false')
        });
    }
})();
(function () {
    'use strict';

    var STORAGE_KEY = 'ksu-a11y-widget-settings';
    var STYLE_ID = 'ksu-a11y-widget-style';
    var ROOT_ID = 'ksu-a11y-widget-root';
    var READING_GUIDE_ID = 'ksu-a11y-reading-guide';
    var DEFAULT_LANG = 'en';

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
        fontSizeStep: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h2l1-3h4l1 3h2L10 5H8L4 19Zm11-8V9h7v2h-2.5v8h-2V11H15Z"></path></svg>',
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
        on: 'On',
        off: 'Off',
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
        lang: DEFAULT_LANG
    };

    var dom = {
        host: null,
        panel: null,
        toggleButton: null,
        liveRegion: null,
        mounted: false,
        initialized: false,
        controls: {},
        profileButtons: {}
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
        lang: DEFAULT_LANG,
        remember: true,
        storageKey: STORAGE_KEY,
        icons: null
    };

    var speechBound = false;
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
            if (parsed.activeMode === null || MODE_PRESETS[parsed.activeMode]) {
                state.activeMode = parsed.activeMode;
            }
        } catch (error) {
            // Ignore invalid localStorage payload.
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
                lang: state.lang
            }));
        } catch (error) {
            // Ignore storage error.
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

    function handleReadSelectedText() {
        if (!state.readSelectedText || !window.getSelection || !window.speechSynthesis) {
            return;
        }
        var text = String(window.getSelection().toString() || '').trim();
        if (!text) {
            return;
        }
        try {
            window.speechSynthesis.cancel();
            var utterance = new window.SpeechSynthesisUtterance(text);
            utterance.lang = state.lang === 'ar' ? 'ar-SA' : 'en-US';
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            // Ignore speech errors.
        }
    }

    function bindSpeechEventsIfNeeded() {
        if (speechBound) {
            return;
        }
        document.addEventListener('mouseup', handleReadSelectedText);
        speechBound = true;
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

        root.classList.toggle('ksu-a11y-zoom-enabled', state.zoomStep > 0);
        try {
            root.style.zoom = String(ZOOM_VALUES[state.zoomStep]);
        } catch (error) {
            root.style.transform = state.zoomStep > 0 ? 'scale(' + ZOOM_VALUES[state.zoomStep] + ')' : '';
            root.style.transformOrigin = 'top left';
        }

        if (dom.host) {
            dom.host.classList.toggle('ksu-a11y-theme-dark', state.darkMode);
        }

        applyDyslexiaFont();
        bindSpeechEventsIfNeeded();
        bindReadingGuideIfNeeded();

        var guide = ensureReadingGuideElement();
        guide.style.display = state.readingGuide ? 'block' : 'none';
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

    function addSectionTitle(parent, key) {
        var title = document.createElement('p');
        title.className = 'ksu-a11y-section-title';
        title.dataset.i18n = key;
        title.textContent = t(key);
        parent.appendChild(title);
    }

    function closePanel() {
        if (!dom.panel || !dom.toggleButton) {
            return;
        }
        dom.panel.hidden = true;
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
        headerReset.addEventListener('click', function () { resetState(true); });

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
        header.appendChild(title);
        header.appendChild(headerActions);

        var body = document.createElement('div');
        body.className = 'ksu-a11y-body';

        var profilesWrap = document.createElement('div');
        addSectionTitle(profilesWrap, 'profiles');
        var profilesGrid = document.createElement('div');
        profilesGrid.className = 'ksu-a11y-profile-grid';
        for (var m = 0; m < MODE_KEYS.length; m += 1) {
            profilesGrid.appendChild(createProfileButton(MODE_KEYS[m]));
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
        resetBtn.addEventListener('click', function () { resetState(true); });
        body.appendChild(resetBtn);

        panel.appendChild(header);
        panel.appendChild(body);

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
        host.dataset.position = options.position === 'left' ? 'left' : 'right';
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
        toggleButton.appendChild(launcherLabel);
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
            var control = dom.controls[key];
            if (control && control.button) {
                control.label.textContent = t(key);
                control.button.setAttribute('title', t(key));
            }
        }

        for (var modeKey in dom.profileButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.profileButtons, modeKey)) {
                dom.profileButtons[modeKey].label.textContent = t(modeKey);
                dom.profileButtons[modeKey].button.setAttribute('title', t(modeKey));
            }
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
            if (Object.prototype.hasOwnProperty.call(dom.controls, key)) {
                var control = dom.controls[key];
                if (control && control.icon) {
                    setIcon(control.icon, key);
                }
            }
        }

        for (var modeKey in dom.profileButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.profileButtons, modeKey)) {
                setIcon(dom.profileButtons[modeKey].icon, modeKey);
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

            if (control.config.kind === 'step') {
                control.button.setAttribute('aria-pressed', 'true');
                control.button.dataset.step = String(state[key]);
                var dots = control.button.querySelectorAll('.ksu-a11y-dot');
                for (var d = 0; d < dots.length; d += 1) {
                    dots[d].classList.toggle('is-active', d < state[key]);
                }
            } else {
                control.button.setAttribute('aria-pressed', state[key] ? 'true' : 'false');
                control.button.classList.toggle('is-active', state[key]);
            }
        }

        for (var modeKey in dom.profileButtons) {
            if (Object.prototype.hasOwnProperty.call(dom.profileButtons, modeKey)) {
                dom.profileButtons[modeKey].button.classList.toggle('is-active', state.activeMode === modeKey);
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
        if (state.lang === lang && dom.initialized) {
            apply(false);
        }
    }

    function setLanguage(lang) {
        if (!lang || typeof lang !== 'string') {
            return;
        }
        state.lang = lang;
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
        root.className = root.className.replace(/\bksu-a11y-[\w-]+\b/g, '').replace(/\s{2,}/g, ' ').trim();

        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        var guide = document.getElementById(READING_GUIDE_ID);
        if (guide && guide.parentNode) {
            guide.parentNode.removeChild(guide);
        }

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
            position: currentScript && currentScript.getAttribute('data-position') === 'left' ? 'left' : 'right',
            lang: (currentScript && currentScript.getAttribute('data-lang')) || DEFAULT_LANG,
            cssHref: (currentScript && currentScript.getAttribute('data-css-href')) || '',
            autoInjectCss: !(currentScript && currentScript.getAttribute('data-auto-css') === 'false')
        });
    }
})();
