## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.
## 2024-05-24 - Information Leakage in Error Handling
**Vulnerability:** The `StockSenseAgent` previously caught exceptions and printed them directly (e.g., `print(f"{self.logger_prefix} ERROR: {e}")`), which leaked internal path details and validation boundaries to standard output.
**Learning:** Raw exception strings often contain sensitive environmental data (like absolute file paths or system configurations) that shouldn't be exposed.
**Prevention:** Catch expected exceptions and log generic, sanitized error messages (e.g., "Invalid file or path") instead of logging the direct exception object.
