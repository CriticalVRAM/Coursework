def city_country(city, country, population = ''):
	if population:
		city_country = (city.title() + ', ' + country.title() + ', population: ' + population)
		return city_country
	else:
		city_country = (city.title() + ', ' + country.title())
		return city_country

import unittest

class CityTestCase(unittest.TestCase):
	
	def test_city_country(self):
			formated_city = city_country('belgrade', 'serbia',)
			self.assertEqual(formated_city, 'Belgrade, Serbia')

	def test_city_country_population(self):
		formated_city = city_country('belgrade', 'serbia', population = '10')
		self.assertEqual(formated_city, 'Belgrade, Serbia, population: 10')

unittest.main()