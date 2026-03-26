## 2024-05-24 - Adaptive Focus Indicators
**Learning:** Hardcoded focus ring colors fail contrast requirements across varying background colors (like the linear-gradient backgrounds used in this app's hero and tech stack sections).
**Action:** Use `*:focus-visible { outline: 3px solid currentColor; outline-offset: 2px; }` globally to automatically adapt visual focus contrast against any background color without complex variable overrides.
