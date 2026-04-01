## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Leakage in Error Messages
**Vulnerability:** The `StockSenseAgent` leaked internal paths or details in `scan_inventory(inventory_file)` and `save_recommendations(output_file)` when an exception occurred.
**Learning:** Printing the exact exception (`e`) can reveal sensitive internal information, such as the full paths to directories or files on the system, which can be useful to an attacker.
**Prevention:** Catch expected exceptions and log generic error messages instead of the exact exception variable.
