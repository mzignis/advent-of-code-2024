import re
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from tools.tools import build_data_filepath
from tools.data import load_file


filepath: Path = build_data_filepath(Path(__file__).stem)
data_input = load_file(filepath)

# -------- task 1 --------
pattern = r"mul\(\s*(\d+)\s*,\s*(\d+)\s*\)"
multiplications = re.findall(pattern, data_input)
results = sum([int(a) * int(b) for a, b in multiplications])
print(results)

# -------- task 2 --------
pattern = r"(mul\(\s*\d+\s*,\s*\d+\s*\)|do\(\)|don't\(\))"
matches = re.findall(pattern, data_input)
commands: list = []
is_enable: bool = True

for match in matches:
    if match == "do()":
        is_enable = True
    elif match == "don't()":
        is_enable = False

    if 'mul' in match and is_enable:
        commands.append(match.replace('mul(', '').replace(')', '').split(','))

results = sum([int(a) * int(b) for a, b in commands])
print(results)
