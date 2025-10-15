# Font Integration

Place licensed Aptos font files in `./fonts/` next to this project root.
Recommended files:
- Aptos-VF.woff2 (variable)
- Aptos-Regular.woff2
- Aptos-Medium.woff2
- Aptos-Semibold.woff2

The CSS in `styles.css` attempts to load the variable font first and falls back to static weights. Use `font-display: swap` for performance.

If you cannot distribute the fonts, add them to `.gitignore`:
```
fonts/
```

