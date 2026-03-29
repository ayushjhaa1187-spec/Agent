## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Exposure in Exception Handling
**Vulnerability:** Catching specific exceptions (`FileNotFoundError`, `ValueError`) but directly printing the exception variable (`e`) can leak sensitive information about file paths and internal logic to users or logs.
**Learning:** Even when securely handling invalid paths, error messages must be generic and never log the exact exception variable (`e`) to prevent information leakage of file paths or internal state.
**Prevention:** Use generic error messages and do not expose stack traces or specific exception variables to user-facing outputs.
