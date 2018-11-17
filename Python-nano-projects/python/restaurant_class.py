class Restaurant():
	def __init__(self, restaurant_name, cuisine_type, ):
		self.restaurant_name = restaurant_name
		self.cuisine_type = cuisine_type
		self.customers_served = 0

	def restaurant_info(self):
		print(
			'Welcome to the ' + self.restaurant_name +
			' where you will be able to eat the finest '
			+ self.cuisine_type + ' food!'
			)
	def restaurant_open(self):
		print("The restaurant is now open!\n")

	def number_served(self):
		print(
			"We have proudly served: " + str(self.customers_served) 
			+ ' customers!' + '\n'
			)

	def calibrate_number_served(self, customers=0):
		self.customers_served = customers

	def daily_customers(self):
		self.customers_served += 35

french_restaurant = Restaurant('Napoleon', 'french')
french_restaurant.restaurant_info()
french_restaurant.restaurant_open()

italian_restaurant = Restaurant('Musolini', 'italian')
italian_restaurant.restaurant_info()
italian_restaurant.restaurant_open()

chinese_restaurant = Restaurant('Mao', 'chinese')
chinese_restaurant.restaurant_info()
chinese_restaurant.restaurant_open()

mexican_restaurant = Restaurant('Chico de Mayo', 'mexican')
mexican_restaurant.restaurant_info()
mexican_restaurant.daily_customers()
mexican_restaurant.number_served()


class IceCreamStand(Restaurant):
	def __init__(self, restaurant_name, cuisine_type, ):
		super().__init__(restaurant_name, cuisine_type, )
		self.flawors = ('chocolate and vanila')

	def flavors_served(self):
		print('We are serving the following flawors: ' + self.flawors + '.')

pedros_icecream = IceCreamStand("Pedro's icecream stand",'icecream', )
pedros_icecream.restaurant_info()
pedros_icecream.flavors_served()
pedros_icecream.calibrate_number_served(10)
pedros_icecream.number_served()