## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-25 - Information Leakage via Exception Logging
**Vulnerability:** Logging the exact exception variable (`e`) in error handlers exposed sensitive internal file paths and directory structures.
**Learning:** Directly printing exception objects can unintentionally leak internal system state to end users or external logs.
**Prevention:** Fail securely by catching specific exceptions and outputting generic error messages that do not expose internal details.
