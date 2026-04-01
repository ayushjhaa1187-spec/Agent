## 2024-05-24 - Dynamic Focus Indicators & Decorative Elements
**Learning:** Using `currentColor` with `outline-offset` provides a universally visible focus indicator that adapts to both light and dark backgrounds, avoiding complex CSS variable overrides. Additionally, decorative emojis in elements like `.feature-icon` need `aria-hidden="true"` to prevent redundant screen reader announcements.
**Action:** Apply `*:focus-visible` globally for robust keyboard accessibility and ensure all pure decorative text/icons are hidden from the accessibility tree.
