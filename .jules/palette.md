## 2024-03-31 - Dynamic Focus Visibility Contrast
**Learning:** Using `currentColor` with `outline-offset` for `*:focus-visible` automatically adapts the visual focus outline color to match the text color, providing accessible contrast against varying background colors without needing complex CSS variable overrides. Adding `aria-hidden="true"` to decorative icons prevents redundant screen reader announcements.
**Action:** Always use `currentColor` for focus outlines when designing elements that appear over multiple different background colors, and explicitly hide decorative emojis from accessibility trees.

## 2024-04-05 - Skip Links and Focus Styles Accessibility
**Learning:** Hiding "Skip to main content" links using negative absolute positioning (`top: -40px`) keeps them within the accessibility tree, making them correctly focusable by keyboard navigation, unlike `display: none` which removes them entirely. Also, using `currentColor` and `outline-offset` provides excellent automatic contrast for `*:focus-visible` styles across various dark and light background sections without needing explicit theme overrides.
**Action:** Consistently use negative positioning for skip links to ensure they work for keyboard users without breaking the visual layout. Utilize `currentColor` for dynamic focus outline contrast.
