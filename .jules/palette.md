
## 2026-03-28 - Accessible Interactive Elements
**Learning:** Decorative icons (like emojis in `.feature-icon`) without `aria-hidden="true"` create redundant noise for screen reader users when adjacent text already provides the context. Additionally, global focus-visible styles using `currentColor` and `outline-offset` provide dynamic, high-contrast keyboard navigation cues across varying background colors without complex CSS variable overrides.
**Action:** Always add `aria-hidden="true"` to purely decorative visual elements. Implement a global `*:focus-visible` rule using `currentColor` for robust keyboard accessibility, and respect user motion preferences by wrapping smooth scrolling in `@media (prefers-reduced-motion: no-preference)`.
