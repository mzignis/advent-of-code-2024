import sys
from pathlib import Path
import numpy as np

sys.path.append(str(Path(__file__).parent.parent))
from tools.tools import build_data_filepath
from tools.data import load_file


filepath: Path = build_data_filepath(Path(__file__).stem)
data_input = [[int(x) for x in line.split()] for line in load_file(filepath).split('\n')]


def is_sorted(arr: list) -> bool:
    return arr == sorted(arr) or arr == sorted(arr, reverse=True)


def is_diff_valid(arr: list) -> bool:
    diff = np.abs(np.diff(arr))
    return not np.any(diff == 0) and not np.any(diff > 3)


def is_valid(arr: list) -> bool:
    return is_sorted(arr) and is_diff_valid(arr)


# -------- task 1 --------
safe_reports: int = 0
for ii, line in enumerate(data_input):
    if not is_valid(line):
        continue
    safe_reports += 1
print(safe_reports)

# -------- task 2 --------
safe_reports = 0

for line in data_input:
    if is_valid(line):
        safe_reports += 1
        continue

    for ii, line_element in enumerate(line):
        tmp_line = line.copy()
        tmp_line.pop(ii)
        if is_valid(tmp_line):
            safe_reports += 1
            break

print(safe_reports)
