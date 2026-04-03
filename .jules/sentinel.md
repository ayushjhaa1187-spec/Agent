## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2025-01-28 - Information Leakage in Error Messages
**Vulnerability:** Exception variables (`e`) containing file paths and internal state were being directly printed to logs in `scan_inventory` and `save_recommendations`.
**Learning:** Logging exact exception messages can inadvertently expose sensitive system information such as directory structures or internal validation logic.
**Prevention:** Catch specific exceptions without binding them to a variable, and log generic, safe error messages that do not expose internal state.
