## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Exposure via Exception Logging
**Vulnerability:** The `StockSenseAgent` exposed raw exception variables `e` to logs in `scan_inventory` and `save_recommendations`, leading to potential leakage of file paths or internal state.
**Learning:** Raw exception strings (like `ValueError` messages detailing out-of-bounds paths) can inadvertently expose sensitive filesystem structure or validation logic to attackers.
**Prevention:** Implement generic error handling by catching specific exceptions without logging their details, using generic, sanitized error messages.
