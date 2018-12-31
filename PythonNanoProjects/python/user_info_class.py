class User():
	def __init__(self, first_name, last_name, age, location, ):
		self.first_name = first_name
		self.last_name = last_name
		self.location = location
		self.age = age
		self.login_attempts = 0

	def describe_user(self):
		print(
			"Here is this users info: \n\n"
			'First_name - ' + self.first_name.title() +'\n'
			'Last_name - ' + self.last_name.title() +'\n'
			'Age - ' + self.age +'\n'
			'Location - ' + self.location.title() +'\n'
			)

	def greet_user(self):
		print('Hello ' + self.first_name.title() + '!')

	def incremental_login_attempts(self):
		self.login_attempts += 1

	def reset_login_attempts(self):
		self.login_attempts = 0

#------------------------------------------------------------------------------

class Privlages():
	def __init__(self, privlages = [
	'can ban users', 'can add posts', 'can can delete posts'
	]):
		self.privlages = privlages
		
	def show_privlages(self):
		print(self.privlages)

class Admin(User):
	def __init__(self, first_name, last_name, age, location, ):
		super().__init__(first_name, last_name, age, location, )
		self.privlages = Privlages()

#------------------------------------------------------------------------------

true_admin = Admin('true', 'admin', 'unknown', 'the ether', )
true_admin.describe_user()
true_admin.privlages.show_privlages()