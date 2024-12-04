import sys
from pathlib import Path

import numpy as np

sys.path.append(str(Path(__file__).parent.parent))
from tools.tools import build_data_filepath
from tools.data import load_file

filepath: Path = build_data_filepath(Path(__file__).stem)
data_input = load_file(filepath)

data = np.array([list(x) for x in data_input.split('\n')])
rows, cols = data.shape


# -------- task 1 --------
counter: int = 0
for row in data:
    for ii in range(cols-3):
        vv = row[ii:ii+4].tolist()
        if vv == ['X', 'M', 'A', 'S'] or vv[::-1] == ['X', 'M', 'A', 'S']:
            counter += 1


for row in data.T:
    for ii in range(cols-3):
        vv = row[ii:ii+4].tolist()
        if vv == ['X', 'M', 'A', 'S'] or vv[::-1] == ['X', 'M', 'A', 'S']:
            counter += 1

for ii in range(rows-3):
    for jj in range(cols-3):
        vv = data[ii:ii+4, jj:jj+4]
        if vv.diagonal().tolist() == ['X', 'M', 'A', 'S']:
            counter += 1
        if np.fliplr(vv).diagonal().tolist() == ['X', 'M', 'A', 'S']:
            counter += 1
        if np.flipud(vv).diagonal().tolist() == ['X', 'M', 'A', 'S']:
            counter += 1
        if np.fliplr(np.flipud(vv)).diagonal().tolist() == ['X', 'M', 'A', 'S']:
            counter += 1

print(counter)

# -------- task 2 --------
counter: int = 0

for ii in range(rows-2):
    for jj in range(cols-2):
        vv = data[ii:ii+3, jj:jj+3]

        vv_lr = np.fliplr(vv).diagonal().tolist()
        vv_ud = np.flipud(vv).diagonal().tolist()
        vv_lr_ud = np.fliplr(np.flipud(vv)).diagonal().tolist()
        vv = vv.diagonal().tolist()

        v0 = vv == ['M', 'A', 'S'] or vv == ['S', 'A', 'M']
        v1 = vv_lr == ['M', 'A', 'S'] or vv_lr == ['S', 'A', 'M']
        v2 = vv_ud == ['M', 'A', 'S'] or vv_ud == ['S', 'A', 'M']
        v3 = vv_lr_ud == ['M', 'A', 'S'] or vv_lr_ud == ['S', 'A', 'M']

        if all([v0, v1, v2, v3]):
            counter += 1

print(counter)
