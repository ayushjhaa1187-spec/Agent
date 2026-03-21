## 2024-03-21 - Dynamic Focus Outline and Decorative Emojis
**Learning:** The UI background uses a complex purple gradient. Hardcoded focus outline colors fail contrast on different parts of the page. Emoticon-based icons are announced redundantly when immediately followed by clear heading text.
**Action:** Apply `*:focus-visible` using `currentColor` for dynamic contrast adaptation against varied backgrounds. Apply `aria-hidden="true"` to structural elements containing decorative emojis when their context is fully described by adjacent text.
