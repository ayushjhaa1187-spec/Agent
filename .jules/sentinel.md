## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Leakage in Error Messages
**Vulnerability:** The `StockSenseAgent` printed raw exception strings (`e`) when handling `FileNotFoundError` and `ValueError`, which could leak internal file paths or state.
**Learning:** Catching and printing exceptions verbatim in public-facing or agent logs can expose sensitive system internals to attackers.
**Prevention:** Catch expected exceptions and print generic, secure error messages instead of logging the actual exception object.
