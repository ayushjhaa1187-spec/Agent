## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Leakage in Error Handling
**Vulnerability:** The `scan_inventory` and `save_recommendations` methods printed raw exception messages (e), exposing internal file paths and system details when a file was not found or failed path validation.
**Learning:** Catching exceptions and directly logging/printing the exception object can leak sensitive backend architecture details to users or logs, creating an information disclosure vulnerability.
**Prevention:** Catch specific exceptions and log generic, safe error messages that do not expose internal state or user-supplied input.
