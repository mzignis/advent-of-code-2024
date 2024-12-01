import sys
from pathlib import Path

import numpy as np

sys.path.append(str(Path(__file__).parent.parent))
from tools.tools import build_data_filepath
from tools.data import load_file, split_lines


filepath: Path = build_data_filepath(Path(__file__).stem)
data_input: np.ndarray = np.array(split_lines(load_file(filepath)), dtype=np.int_)

# part 1
col0: np.ndarray = np.sort(data_input[:, 0])
col1: np.ndarray = np.sort(data_input[:, 1])
data: np.ndarray = np.column_stack((col0, col1))
diff: np.ndarray = np.abs(np.diff(data, axis=1))
diff_sum: int = np.sum(diff)
print(diff_sum)

# part 2
results: list = list()
for num_col0 in col0:
    rr: int = col1[col1 == num_col0].shape[0]
    results.append(rr * num_col0)
print(np.sum(results))
