## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-25 - Information Leakage in Error Messages
**Vulnerability:** The `StockSenseAgent` caught exceptions (`ValueError`, `FileNotFoundError`) and directly printed the exception variable `e` in methods like `scan_inventory` and `save_recommendations`. The underlying exceptions, such as the `ValueError` from `_validate_path`, contained sensitive file path variables.
**Learning:** Exposing raw exception strings or raw user inputs in error logs or responses can leak internal paths, system structures, or sensitive information, violating the principle of failing securely.
**Prevention:** Catch expected exceptions and log/return generic, sanitized error messages that do not embed raw variables, system details, or the exception object itself.
