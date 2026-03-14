## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-25 - Information Leakage in Error Messages
**Vulnerability:** The application was logging the exact exception variable (`e`) when handling expected file path exceptions (`FileNotFoundError`, `ValueError`).
**Learning:** Logging specific exception messages (like internal file paths or state details) can inadvertently expose sensitive system information to an attacker.
**Prevention:** Catch specific exceptions but emit generic error messages to fail securely without leaking internal information.
