from pathlib import Path
from typing import Union

import requests
import yaml


def load_yaml(filepath: Path) -> dict:
    with open(filepath, 'r') as f:
        return yaml.safe_load(f)


def get_data(cookie_session, day: Union[str, int], year: int = 2024) -> Union[str, None]:
    url = f"https://adventofcode.com/{year}/day/{day}/input"

    # Add the session cookie to the headers
    headers = {
        "Cookie": f"session={cookie_session}"
    }
    try:
        # Send a GET request to the URL
        response = requests.get(url, headers=headers)

        # Check if the request was successful
        if response.status_code == 200:
            input_data = response.text
            return input_data
        else:
            print(f"Failed to fetch input: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"An error occurred: {e}")


def save_file(filepath: Path, data: str) -> None:
    with open(filepath, 'w') as f:
        f.write(data)


def load_file(filepath:  Path) -> str:
    with open(filepath, 'r') as f:
        return f.read()


def split_lines(data: str) -> list:
    return [x.replace('\n', '').split() for x in data.splitlines()]


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--day", default=2, type=int)
    args = parser.parse_args()
    day_number: int = args.day

    config: dict = load_yaml(Path(__file__).parent.parent / 'config' / 'config.yaml')

    advent_of_code_data = get_data(config['cookies'], day_number)
    if advent_of_code_data is None:
        exit(1)
    filepath_output: Path = Path(__file__).parent.parent / 'data' / f'{str(day_number).zfill(2)}.txt'
    save_file(filepath_output, advent_of_code_data)

    print(f"Data saved to {filepath_output}")
