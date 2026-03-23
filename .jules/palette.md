## 2024-03-24 - Dynamic Focus States on Gradients
**Learning:** The `index.html` frontend uses a custom CSS purple gradient background, making static focus outline colors unreadable or low contrast.
**Action:** Used `currentColor` for `:focus-visible` outlines (`outline: 3px solid currentColor;`) to dynamically adapt visual focus contrast against varying background colors without complex variable overrides.
