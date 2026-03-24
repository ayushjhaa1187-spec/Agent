import pytest
from datetime import datetime
from unittest.mock import patch, MagicMock
import sys
import os

# Mock pandas before importing agent
sys.modules['pandas'] = MagicMock()

# Add src to python path to allow imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from agent import MedicineRecord

@pytest.fixture
def mock_datetime_now():
    # We patch the datetime class in the agent module
    with patch('agent.datetime') as mock_date:
        # We need to ensure strptime works as expected.
        # Since we are mocking the class, we need to wire up strptime to the real implementation
        real_datetime = datetime
        mock_date.strptime.side_effect = real_datetime.strptime

        # We also need to mock datetime.now()
        fixed_now = datetime(2023, 1, 1)
        mock_date.now.return_value = fixed_now

        yield mock_date

def test_days_until_expiry_valid(mock_datetime_now):
    # expiry_date is 10 days after fixed_now (2023-01-01)
    record = MedicineRecord(name="Test Med", stock=10, expiry_date="2023-01-11", daily_sales=1)

    # expected: (2023-01-11 - 2023-01-01).days = 10
    # Note: we need to be careful. agent.py uses (expiry - datetime.now()).days
    # If datetime.now() returns a datetime object, and expiry is a datetime object,
    # subtraction returns a timedelta. timedelta.days is an integer.

    # Verify the mock is working as expected
    from agent import datetime as agent_datetime
    assert agent_datetime.now() == datetime(2023, 1, 1)

    assert record.days_until_expiry() == 10

def test_days_until_expiry_invalid_format(mock_datetime_now):
    # Invalid date format
    # Even if mock_datetime_now is used, strptime should still raise ValueError
    # because we wired it to real_datetime.strptime

    record = MedicineRecord(name="Test Med", stock=10, expiry_date="11-01-2023", daily_sales=1)

    with pytest.raises(ValueError):
        record.days_until_expiry()

@patch('builtins.print')
def test_scan_inventory_secure_error_message(mock_print, mock_datetime_now):
    from agent import StockSenseAgent
    import agent as agent_module
    # We need to simulate a FileNotFoundError since pandas is mocked out
    agent_module.pd.read_csv.side_effect = FileNotFoundError()
    agent = StockSenseAgent()
    agent.scan_inventory('data/non_existent_file.csv')
    mock_print.assert_any_call(f"{agent.logger_prefix} ERROR: Failed to access inventory file.")

@patch('builtins.print')
def test_save_recommendations_secure_error_message(mock_print, mock_datetime_now):
    from agent import StockSenseAgent
    agent = StockSenseAgent()
    # Mock _validate_path to raise ValueError directly, as os.makedirs might fail first if not mocked
    with patch.object(agent, '_validate_path', side_effect=ValueError("Security Error")):
        agent.save_recommendations({}, output_file='../outside_dir.json')
    mock_print.assert_called_with(f"{agent.logger_prefix} ERROR: Invalid output path provided.")
