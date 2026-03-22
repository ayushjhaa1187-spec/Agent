## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.
## 2024-05-24 - Information Leakage via Exception Logging
**Vulnerability:** The application logged raw exception variables (`e`) when handling file operations, which exposed absolute file paths and internal directory structures.
**Learning:** Catching specific exceptions is good, but directly printing the exception object can inadvertently leak sensitive system information.
**Prevention:** Always use generic error messages in logs or user outputs when handling expected exceptions, and never log the raw exception object unless using secure internal logging.
