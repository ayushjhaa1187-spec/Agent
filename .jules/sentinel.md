## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.
## 2024-03-21 - Exception Message Info Leakage
**Vulnerability:** Exact exception variables (`e`) were being logged and potentially printed to user output during file validation and I/O.
**Learning:** Returning raw error objects leaks internal system paths and potentially internal state because the default Python exceptions usually contain these strings.
**Prevention:** Catch specific exceptions but log a generic failure message to the end user without revealing internal details or paths.
