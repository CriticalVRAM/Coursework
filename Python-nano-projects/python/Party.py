names = ['Leoluch Lamperuge', 'Light Yagami', 'The Count of Monte Christo']

for name in names:
	print('\nTo whom it may concer,\nyou'+' '+name+' '+'are cordinaly invited to attend the grand party at sol 24 sucka a cocka.')

print('\nRegrefully The Count of Monte Christo will not be able to atend the party for he is in fact a space vampire. With love sucka on my cocka.')

names.remove('The Count of Monte Christo')
names.insert(2, 'Satsuky Kiryuin')

for name in names:
	print('\nTo whom it may concer,\nyou'+' '+name+' '+'are cordinaly invited to attend the grand party at sol 24 sucka a cocka.')

print('\nGood news, I got a septilijion dolars now so 3 more people can cum yeet.')

names.append('Matoi Ruyko')
names.insert(1,'Jibly Fuglel of The Old Deus')
names.insert(5,'Geralt of Rivia')

for name in names:
	print('\nTo whom it may concer,\nyou'+' '+name+' '+'are cordinaly invited to attend the grand party at sol 24 sucka a cocka.')

count = 0
while count < 3:
	guest = names.pop(0)
	print('\nTerribly sorry'+' '+guest+' '+', but u gay and im poor so no cum ok stay fresh yeet.')
	count = count + 1
guest = names.pop()
print('\nTerribly sorry'+' '+guest+' '+', but u gay and im poor so no cum ok stay fresh yeet.')

print("\nI bought all the bitcoin and now i'm poor, only"+" "+str(len(names))+" "+"people are invited.")

print('\nYou are still invited'+' '+names.pop(0)+'.')
print('\nYou are still invited'+' '+names.pop(0)+'.')
print(names)