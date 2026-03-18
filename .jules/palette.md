## 2024-05-18 - Semantic Wrapper & Accessible Features
**Learning:** Found a missing `<main>` wrapper and decorative emojis lacking `aria-hidden` attributes. Using `currentColor` for `:focus-visible` adapts dynamically to varying backgrounds, avoiding complex styling overrides.
**Action:** Wrapped core content (`.hero`, `.features`, `.tech-stack`) in `<main>` with `flex: 1` to preserve layout, and added a skip-to-content link using negative absolute positioning.
