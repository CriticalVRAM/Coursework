class Employee():
	def __init__(self, annual_salary, ):
		self.annual_salary = annual_salary

	def give_raise(self):
		raise_ammount = input('?    ')
		if raise_ammount == '':
			raise_ammount=5000
		self.annual_salary += int(raise_ammount)
		return self.annual_salary

import unittest

class TestEmployee(unittest.TestCase):
	def setUp(self):
		self.worker = Employee(50000)
		self.results = [55000, 60000]

	def test_default_raise(self):
		money = self.worker.give_raise()
		self.assertIn(money, self.results)

	def custom_default_raise(self):
		money = self.worker.give_raise()
		self.assertIn(money, self.results)

unittest.main()