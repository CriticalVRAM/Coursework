import json

filename = 'number.json'

try:
	with open(filename) as f_obj:
		number = json.load(f_obj)
except FileNotFoundError:
	number = input('What is your favorite number?    ')
	with open(filename, 'w') as f_obj:
		json.dump(number, f_obj)
		print('Now I know.')
else:
	print("I know your favorite number it's " + number + "!")