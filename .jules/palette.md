## 2024-05-24 - Dynamic Focus Visibility Contrast
**Learning:** Using `currentColor` with `outline-offset` for `*:focus-visible` ensures that focus indicators remain visible and adapt their contrast dynamically against varying background gradients, removing the need for complex CSS variable overrides.
**Action:** Default to `outline: 3px solid currentColor; outline-offset: 2px;` for global focus states in apps with multi-colored backgrounds or complex gradients.
