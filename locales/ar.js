(function () {
    window.__KSU_A11Y_LOCALES__ = window.__KSU_A11Y_LOCALES__ || {};

    window.__KSU_A11Y_LOCALES__.ar = {
        title: 'إمكانية الوصول',
        open: 'فتح خيارات إمكانية الوصول',
        close: 'إغلاق لوحة إمكانية الوصول',
        languageName: 'العربية',
        languageIcon: '🇸🇦',
        resetAll: 'إعادة تعيين الكل',
        profiles: 'الملفات الجاهزة',
        text: 'النص',
        view: 'العرض',
        color: 'الألوان',
        epilepsy: 'وضع آمن للصرع',
        visuallyImpaired: 'ضعف البصر',
        cognitive: 'إعاقة معرفية',
        motorImpaired: 'إعاقة حركية',
        colorblind: 'عمى الألوان',
        dyslexia: 'وضع عسر القراءة',
        adhd: 'وضع ADHD',
        blindness: 'العمى',
        fontSizeStep: 'الحجم',
        fontWeightStep: 'السماكة',
        lineHeightStep: 'السطور',
        letterSpacingStep: 'تباعد',
        wordSpacingStep: 'الكلمات',
        textAlign: 'محاذاة',
        dyslexiaFont: 'خط عسر القراءة',
        readSelectedText: 'قراءة المحدد',
        zoomStep: 'تكبير',
        highlightLinks: 'الروابط',
        highlightHeadings: 'العناوين',
        bigCursor: 'المؤشر',
        reduceMotion: 'الحركة',
        focusHighlight: 'التركيز',
        hideImages: 'الصور',
        readingGuide: 'دليل القراءة',
        darkMode: 'واجهة داكنة',
        highContrast: 'تباين',
        lowSaturation: 'تشبع',
        monochrome: 'أحادي',
        on: 'تشغيل',
        off: 'إيقاف',
        stateSaved: 'تم حفظ إعدادات إمكانية الوصول',
        panelOpened: 'تم فتح لوحة إمكانية الوصول',
        panelClosed: 'تم إغلاق لوحة إمكانية الوصول'
    };

    if (window.KsuAccessibilityWidget && typeof window.KsuAccessibilityWidget.registerLocale === 'function') {
        window.KsuAccessibilityWidget.registerLocale('ar', window.__KSU_A11Y_LOCALES__.ar);
    }
})();
