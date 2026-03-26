## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Exception Information Leakage in Error Handling
**Vulnerability:** The `StockSenseAgent` logged raw exception details in `scan_inventory` and `save_recommendations` when path validation failed, leaking sensitive internal path structures to logs or standard output.
**Learning:** Directly passing the exception object `e` to error outputs bypasses the secure failure principle by potentially exposing unexpected context.
**Prevention:** Catch expected exceptions and replace the output with generic, hardcoded error messages to ensure failures are secure and do not leak internal state or data paths.
