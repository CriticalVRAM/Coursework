filename = 'guest_book.txt'

with open(filename, 'a') as file_object:
	while True:
		name = input('Hello! Please enter your name...    ')
		if name == 'q':
			break
		elif name == 'Leoluch':
			print('Oh wow! Thank you for comming')
			print('Thank you for your input!\n')
			file_object.write(name + ' has visited.\n')
		elif name == 'Satsuki':
			print("I'm so glad you came.")
			print('Thank you for your input!\n')
			file_object.write(name + ' has visited.\n')
		else:
			print('Thank you for your input!\n')
			file_object.write(name + ' has visited.\n')