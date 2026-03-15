## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.
## 2024-05-15 - Prevent Information Leakage in Error Logs
**Vulnerability:** Exception details (e.g., file paths) were being logged directly to output via `print(f"ERROR: {e}")` in `src/agent.py`.
**Learning:** Catching exceptions and directly printing the exception object can expose internal system paths or states, which violates fail-secure principles.
**Prevention:** Use generic error messages that indicate the failure without exposing the underlying exception details or variables.
