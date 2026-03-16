## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.
## 2024-05-24 - Prevent Information Leakage in Error Messages
**Vulnerability:** System file paths and allowed directory structures were exposed in exception error messages when validating paths.
**Learning:** Returning or logging raw exception strings (like `e` in `except Exception as e`) can inadvertently expose sensitive internal environment details to an attacker.
**Prevention:** Catch specific exceptions and log generic, sanitized error messages that do not reveal internal state or unvalidated user input.
