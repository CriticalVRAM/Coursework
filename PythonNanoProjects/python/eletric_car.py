class Battery():
	def __init__(self, battery_size = 70, ):
		self.battery_size = battery_size

	def describe_battery(self):
		print("This car has a " + str(self.battery_size) + "-kWh battery.")

	def upgrade_battery(self):
		self.battery_size = 85
		return self.battery_size
		
class Eletric_car():
	def __init__(self, model, ):
		self.model = model
		self.battery = Battery()

my_tesla = Eletric_car('Tesla', )
my_tesla.battery.describe_battery()
my_tesla.battery.upgrade_battery()
my_tesla.battery.describe_battery()