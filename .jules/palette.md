## 2026-03-20 - Focus Visibility & Decorative Icons
**Learning:** Hardcoded outline colors often fail contrast checks against varying background colors. Additionally, decorative emojis used as icons are read aloud by screen readers, creating redundant noise when adjacent text already provides the context.
**Action:** Use `currentColor` for `:focus-visible` styles to dynamically adapt visual focus contrast against varying background colors without complex variable overrides. Add `aria-hidden="true"` to decorative emoji icons to prevent redundant screen reader announcements.
