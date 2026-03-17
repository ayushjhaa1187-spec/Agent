## 2024-05-24 - Path Traversal Vulnerability in File Loading
**Vulnerability:** The `StockSenseAgent` accepted arbitrary paths in `scan_inventory(inventory_file)` and `save_recommendations(output_file)`, leading to path traversal (e.g., `../../etc/passwd`).
**Learning:** File paths passed as arguments without validation can allow an attacker to read/write outside the intended directory boundary.
**Prevention:** Implement path validation using `os.path.abspath` and `os.path.commonpath` to enforce strict directory restrictions.

## 2024-05-24 - Information Exposure in Exception Handling
**Vulnerability:** The application was catching exceptions and printing the raw exception variable `e` to standard output. This could expose internal file paths, state, or other sensitive information if a malicious input triggered the error.
**Learning:** Exception messages can leak implementation details that are valuable to attackers (e.g., directory structures or expected variables). Error messages should fail securely and provide only generic context to the end-user or logs.
**Prevention:** Avoid logging or printing raw exception objects directly. Instead, use generic error messages, such as "File access or validation error occurred," or implement a structured logging system that segregates internal diagnostics from user-facing output.
