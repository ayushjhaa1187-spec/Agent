## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.
## 2026-03-25 - Prevent Path Leakage in Error Logs
**Vulnerability:** Information Exposure (Path Leakage). The exact exception variable `e` was being printed in `scan_inventory` and `save_recommendations`, which included internal filesystem paths when validation failed.
**Learning:** Catching specific exceptions is good, but passing the raw exception message to logs or output can silently leak internal application state and file structure.
**Prevention:** Error messages should be generic and fail securely without exposing internal state or paths.
