## 2024-03-22 - Dynamic Focus Contrast
**Learning:** Using `currentColor` for `:focus-visible` outlines provides an accessible and scalable way to dynamically adapt visual focus contrast against varying background colors without complex CSS variables.
**Action:** Apply `*:focus-visible { outline: 3px solid currentColor; outline-offset: 2px; }` to automatically ensure adequate keyboard navigation focus visibility across light and dark backgrounds.
