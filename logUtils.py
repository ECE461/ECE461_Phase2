import os
import traceback
from pathlib import Path
import re
import inspect

# Enum-like log levels
class LogLevel:
    SILENT = 0  # Default log level
    INFO = 1
    DEBUG = 2

# Set settings from environment variables
env_log_level = os.getenv('LOG_LEVEL')
log_level = int(env_log_level) if env_log_level and env_log_level.isdigit() and int(env_log_level) in vars(LogLevel).values() else LogLevel.SILENT
default_file_path = Path(__file__).parent / 'default.log'
log_file_path = os.getenv('LOG_FILE', default_file_path)

# Create log file if it does not exist
log_file_path = Path(log_file_path)
log_file_path.touch(exist_ok=True)

# Function to extract file and line number from the stack trace
def get_file_line_info() -> str:
    try:
        frame = inspect.currentframe().f_back
        line_number = frame.f_lineno
        function_name = frame.f_code.co_name
        return f"{function_name}:{line_number}"
    except Exception as error:
        return "-:-"

# Logger class
class Logger:
    
    @staticmethod
    def logInfo(message: str):
        if log_level >= LogLevel.INFO:
            try:
                file_line_info = get_file_line_info()
                with open(log_file_path, 'a', encoding='utf-8') as log_file:
                    
                    log_file.write(f"[{file_line_info}] {message}\n")
            except Exception as error:
                print(f"Error writing to log file: {error}")
    
    @staticmethod
    def logDebug(message: str):
        if log_level >= LogLevel.DEBUG:
            try:
                file_line_info = get_file_line_info()
                with open(log_file_path, 'a', encoding='utf-8') as log_file:
                    log_file.write(f"[{file_line_info}] {message}\n")
            except Exception as error:
                print(f"Error writing to log file: {error}")
