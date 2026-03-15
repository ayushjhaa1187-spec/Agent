## 2024-05-24 - Accessibility improvements for emojis and focus outlines
**Learning:** Decorative emojis can be redundantly announced by screen readers if not hidden. Using `currentColor` for `:focus-visible` outlines provides better contrast adaptibility for keyboard users.
**Action:** Use `aria-hidden="true"` on decorative emojis like feature icons. Apply `:focus-visible { outline: 3px solid currentColor; outline-offset: 2px; }` to interactive elements.
