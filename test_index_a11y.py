import re

with open("index.html", "r") as f:
    html = f.read()

print("Focus styles:", "focus" in html.lower())
print("ARIA attributes:", "aria-" in html.lower())
print("Smooth scroll:", "scroll-behavior" in html.lower())
print("Feature icons (emoji):", len(re.findall(r'<div class="feature-icon">', html)))
