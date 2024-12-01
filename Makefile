create-environment:
	python3 -m venv .env
	source .env/bin/activate
	pip install -r requirements.txt

get-data:
	python tools/data.py -d $(DAY)
