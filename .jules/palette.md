## 2024-05-24 - Dynamic Focus Outlines
**Learning:** Hardcoded focus outline colors fail contrast requirements when used across components with varying background colors (e.g., solid buttons vs transparent links).
**Action:** Use `currentColor` for `:focus-visible` styles (`outline: 3px solid currentColor`) to automatically adapt visual focus contrast against varying background colors without complex variable overrides.
