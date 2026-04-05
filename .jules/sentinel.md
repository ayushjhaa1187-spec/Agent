## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Leakage via Exception Logging
**Vulnerability:** The error handlers in `scan_inventory` and `save_recommendations` directly logged the exception variable (`e`), which leaked internal directory structures and specific security error messages from `_validate_path`.
**Learning:** Even when errors are caught, logging the raw exception can inadvertently expose sensitive system internals to users or logs accessible by unauthorized parties.
**Prevention:** Catch specific exceptions but log generic, safe error messages that do not expose internal state or inputs.
