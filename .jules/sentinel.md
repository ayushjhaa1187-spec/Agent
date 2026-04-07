## 2024-04-06 - Missing rel="noopener noreferrer" on target="_blank" links
**Vulnerability:** External links opening in new tabs (`target="_blank"`) without `rel="noopener noreferrer"`.
**Learning:** This exposes the application to reverse tabnabbing, where the newly opened tab can gain partial access to the original window via the `window.opener` API, allowing it to potentially redirect the user to a malicious page.
**Prevention:** Always add `rel="noopener noreferrer"` to any `<a>` tag that uses `target="_blank"`, especially when the `href` is user-generated or points to an external Sandbox URL.
