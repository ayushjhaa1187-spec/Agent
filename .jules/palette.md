## 2024-05-18 - Accessible Focus States and Smooth Scrolling
**Learning:** Using `currentColor` with `outline-offset` provides high contrast focus rings that dynamically adjust to their container's text color. `scroll-behavior: smooth` is an accessibility win for orientation, but must be wrapped in `@media (prefers-reduced-motion: no-preference)` to protect users with vestibular disorders.
**Action:** Default to this pattern for focus states and always protect motion-based CSS with the prefers-reduced-motion media query.
