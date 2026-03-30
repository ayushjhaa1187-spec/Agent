## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Leakage in Error Handling
**Vulnerability:** Exception variables (`e`) were directly printed in `scan_inventory` and `save_recommendations`, leaking sensitive internal paths.
**Learning:** Logging raw exception objects from file operations can inadvertently leak internal state and directory structures to attackers.
**Prevention:** Use generic error messages when catching exceptions related to file access and validation.
