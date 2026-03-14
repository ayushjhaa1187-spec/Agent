## 2024-05-24 - Accessible Smooth Scroll & Focus States
**Learning:** Using `currentColor` for `:focus-visible` creates highly adaptable focus rings, while `scroll-behavior: smooth` must be wrapped in `@media (prefers-reduced-motion: no-preference)` to respect user settings. Decorative emojis need `aria-hidden="true"` to prevent screen reader noise.
**Action:** Always apply `currentColor` for focus styles, wrap smooth scrolling in reduced-motion queries, and hide decorative emojis in future UI components.
