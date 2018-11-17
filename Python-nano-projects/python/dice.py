from random import randint

class Die():
	def __init__(self, sides = 6):
		self.sides = sides

	def roll_die(self):
		
		y = 0
		rolls = []
		while y <= 1000:
			roll = randint(1, self.sides)
			rolls.append(roll)
			y += 1
		print(rolls)

die = Die()
die.roll_die()