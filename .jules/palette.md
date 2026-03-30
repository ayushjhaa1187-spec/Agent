
## 2024-05-28 - Dynamic Focus Outlines and Accessible Scrolling
**Learning:** Using `*:focus-visible` with `currentColor` provides an adaptive focus state that works across varying backgrounds without needing complex variable overrides. Additionally, smooth scrolling should always be wrapped in `@media (prefers-reduced-motion: no-preference)` to respect user OS accessibility settings regarding animations.
**Action:** Default to `outline: 3px solid currentColor; outline-offset: 2px;` for global focus states and enforce `prefers-reduced-motion` for all scrolling and transition behaviors.
