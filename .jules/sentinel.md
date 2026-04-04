## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.
## 2024-05-24 - Prevent Information Leakage in Error Logs
**Vulnerability:** Exception objects containing sensitive file paths and directory structures were directly logged.
**Learning:** Using generic blanket exception logging (e.g. `print(f"ERROR: {e}")`) in file I/O operations leaks local directory structures when validation fails.
**Prevention:** Catch specific exceptions and log generic, safe error messages that inform the user of failure without exposing underlying internal state or paths.
