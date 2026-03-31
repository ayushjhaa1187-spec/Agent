## 2024-03-31 - Path Traversal Vulnerability in File Loading
**Vulnerability:** Unrestricted file access allowed arbitrary files to be read via `../` sequences in the `inventory_file` parameter.
**Learning:** The agent directly passed user-supplied file paths to `pd.read_csv` without any path sanitization or restriction to a specific directory.
**Prevention:** All file operations must use a dedicated `_validate_path` method that uses `os.path.commonpath` to ensure the resolved path stays within the intended directory.

## 2024-03-31 - Exception Information Leakage
**Vulnerability:** Information leakage of internal absolute file paths via unhandled exception variables (`e`) in error logs.
**Learning:** Although path traversal was protected against, the `_validate_path` method's `ValueError` contained internal absolute paths that were directly printed to the console upon catching the exception.
**Prevention:** Error messages must be generic and never log the exact exception variable (`e`) to prevent information leakage of file paths or internal state.
