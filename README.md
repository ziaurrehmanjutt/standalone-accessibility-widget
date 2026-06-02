# Standalone Accessibility Widget

This package is framework-agnostic.
It works with plain HTML, PHP, Laravel, React, Vue, Angular, or any other frontend stack because it uses browser DOM APIs only.

## Folder Contents

- `accessibility-widget.js`: Main universal widget script.
- `accessibility-widget.css`: Widget UI style and accessibility class rules.
- `accessibility-widget-icons.js`: Optional predefined icon pack override script.
- `locales/en.js`: English language dictionary chunk.
- `locales/ar.js`: Arabic language dictionary chunk.

## Quick Start (Any Website)

Add these tags before closing `</body>`:

```html
<link rel="stylesheet" href="/path/to/accessibility-widget.css" />
<script src="/path/to/locales/en.js"></script>
<script src="/path/to/accessibility-widget-icons.js"></script>
<script src="/path/to/accessibility-widget.js"></script>
```

That is enough for auto-initialization.

If you do not want the optional icon pack, remove `accessibility-widget-icons.js`.

## Script Tag Options

You can control behavior using script attributes:

```html
<script
  src="/path/to/accessibility-widget.js"
  data-lang="en"
  data-position="right"
  data-auto-css="false"
  data-css-href="/path/to/accessibility-widget.css"
  data-auto-init="true"
></script>
```

### Available Attributes

- `data-lang`: Initial language code (`en`, `ar`, etc.).
- `data-position`: `right` or `left`.
- `data-auto-css`: `true` (default) or `false`.
- `data-css-href`: Optional explicit CSS path for auto CSS injection.
- `data-auto-init`: `true` (default) or `false`.

## Manual Initialization

If you disable auto init (`data-auto-init="false"`), initialize yourself:

```html
<script src="/path/to/accessibility-widget.js" data-auto-init="false"></script>
<script>
  window.KsuAccessibilityWidget.init({
    lang: 'en',
    position: 'right',
    autoInjectCss: false,
    cssHref: '/path/to/accessibility-widget.css',
    remember: true,
    storageKey: 'my-custom-a11y-key'
  });
</script>
```

## Public API

After script load, this global API is available:

```js
window.KsuAccessibilityWidget.init(options);
window.KsuAccessibilityWidget.destroy();
window.KsuAccessibilityWidget.setLanguage('en');
window.KsuAccessibilityWidget.registerLocale('fr', dictionary);
window.KsuAccessibilityWidget.registerIcons(iconMap);
window.KsuAccessibilityWidget.getState();
window.KsuAccessibilityWidget.apply();
```

Version-safe alias is also available:

```js
window.KsuAccessibilityWidgetV1
```

This avoids global conflicts if another future version uses a different global API.

## Icons (Built-In + Custom)

The widget ships with built-in SVG icons.
You can replace all or some icons in two ways:

1. Include optional predefined icon bundle before widget script:

```html
<script src="/path/to/accessibility-widget-icons.js"></script>
<script src="/path/to/accessibility-widget.js"></script>
```

2. Register custom icons in code:

```html
<script src="/path/to/accessibility-widget.js"></script>
<script>
  window.KsuAccessibilityWidget.registerIcons({
    launcher: '<svg viewBox="0 0 24 24"><path d="..." /></svg>',
    highContrast: '<svg viewBox="0 0 24 24"><path d="..." /></svg>'
  });
</script>
```

Supported icon keys:

- `launcher`
- `close`
- `fontSize`
- `highContrast`
- `monochrome`
- `highlightLinks`
- `readableFont`
- `lineHeight`
- `letterSpacing`
- `hideImages`
- `reduceMotion`
- `focusOutline`
- `reset`

## Language Chunks

You can ship separate language files and load only what you need.

Example custom locale:

```js
window.KsuAccessibilityWidget.registerLocale('fr', {
  title: 'Accessibilite',
  open: 'Options d accessibilite',
  close: 'Fermer le panneau',
  reset: 'Reinitialiser',
  fontSize: 'Taille du texte'
});
```

Then switch language:

```js
window.KsuAccessibilityWidget.setLanguage('fr');
```

## React / Vue / Angular Usage

No framework-specific package is required.
Use the same `<script>` and `<link>` include in your base HTML shell:

- React: `public/index.html`
- Vue CLI: `public/index.html`
- Angular: `src/index.html`

For SPA route changes, the widget remains mounted globally and keeps localStorage preferences.

## Styling and CSS Isolation

- Widget styles are fully self-contained in `accessibility-widget.css`.
- It does not require Tailwind CSS.
- All classes are namespaced with `ksu-a11y-` to prevent style conflicts.
- No dependency on host framework CSS variables or utility classes.

## Accessibility Features Included

- Font size step
- Line height step
- Letter spacing step
- High contrast
- Monochrome
- Link highlighting
- Readable font mode
- Hide images
- Reduce motion
- Focus outline enhancement
- Keyboard support (Escape closes panel)
- ARIA live announcement for state changes

## Notes

- Settings are saved to localStorage by default.
- Widget class names are namespaced with `ksu-a11y-` to avoid CSS collisions.
- If your site uses strict CSP, host files locally and allow your own origin.

## Build Minified Files

Use a small local npm setup inside this folder to produce minified assets.

### 1) Initialize npm in this folder

```bash
cd standalone-accessibility-widget
npm init -y
```

### 2) Install minification packages

```bash
npm install --save-dev terser csso-cli
```

### 3) Run minify commands

```bash
npx terser accessibility-widget.js -c -m --comments false -o accessibility-widget.min.js
npx csso accessibility-widget.css --output accessibility-widget.min.css
npx terser accessibility-widget-icons.js -c -m --comments false -o accessibility-widget-icons.min.js
npx terser locales/en.js -c -m --comments false -o locales/en.min.js
npx terser locales/ar.js -c -m --comments false -o locales/ar.min.js
```

## Recommended package.json Scripts

Add these scripts to your local `package.json` in this folder:

```json
{
  "scripts": {
   "minify:js": "terser accessibility-widget.js -c -m --comments false -o accessibility-widget.min.js",
    "minify:icons": "terser accessibility-widget-icons.js -c -m --comments false -o accessibility-widget-icons.min.js",
   "minify:css": "csso accessibility-widget.css --output accessibility-widget.min.css",
   "minify:locales": "terser locales/en.js -c -m --comments false -o locales/en.min.js && terser locales/ar.js -c -m --comments false -o locales/ar.min.js",
    "build": "npm run minify:js && npm run minify:icons && npm run minify:css && npm run minify:locales"
  }
}
```

Then run:

```bash
npm run build
```

## Release Workflow (After Any Source Change)

When you update any source file (JS, CSS, or locale), use this process:

1. Edit source files:
  - `accessibility-widget.js`
  - `accessibility-widget.css`
  - `locales/*.js`
2. Rebuild minified outputs:
  - `npm run build`
3. Verify these files are refreshed:
  - `accessibility-widget.min.js`
  - `accessibility-widget-icons.min.js`
  - `accessibility-widget.min.css`
  - `locales/en.min.js`
  - `locales/ar.min.js`
4. Publish/copy this file set to target websites:
  - Source files (optional for debugging)
  - Minified files (required for production)
  - README for integrators

## Production Include Example

For production websites, prefer minified files:

```html
<link rel="stylesheet" href="/path/to/accessibility-widget.min.css" />
<script src="/path/to/locales/ar.min.js"></script>
<script src="/path/to/accessibility-widget-icons.min.js"></script>
<script src="/path/to/accessibility-widget.min.js" data-lang="ar"></script>
```

## Minimal Test Page

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Widget Test</title>
  <link rel="stylesheet" href="./accessibility-widget.css" />
</head>
<body>
  <h1>Accessibility Widget Test</h1>
  <p>Use the floating button to open accessibility controls.</p>

  <script src="./locales/en.js"></script>
  <script src="./accessibility-widget-icons.js"></script>
  <script src="./accessibility-widget.js"></script>
</body>
</html>
```
