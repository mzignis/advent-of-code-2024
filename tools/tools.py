from pathlib import Path
from typing import Union


def build_data_filepath(input_day: Union[int, str]) -> Path:
    return Path(__file__).parent.parent / f'data' / f'{input_day}.txt'


if __name__ == '__main__':
    pass
