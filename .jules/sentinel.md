## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2026-03-19 - Information Leakage in Error Handlers
**Vulnerability:** The `StockSenseAgent` printed raw exception messages (e.g., `print(f"... ERROR: {e}")`) in `scan_inventory` and `save_recommendations`, which could leak sensitive internal file paths or system state.
**Learning:** Catching exceptions and directly logging or returning the exception object/string can inadvertently expose internal architecture details to attackers, aiding in further exploitation like path traversal.
**Prevention:** Catch specific exceptions and log generic, sanitized error messages that do not include the exception variable (`e`), while failing securely.
