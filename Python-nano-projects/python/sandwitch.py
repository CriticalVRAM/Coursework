sandwich_orders = ['pastrami', 'cheese ', 'chicken ', 'ham ', 'tuna fish ', 'pastrami', 'pastrami']
finished_orders = []

for sandwich in sandwich_orders:
    if sandwich == 'pastrami':
        print('We are out of pastrami.')
        while 'pastrami' in sandwich_orders:
            sandwich_orders.remove('pastrami')
    else:
        print('Your ' + sandwich + 'sandwich has been made.')
        sandwich = sandwich + 'sandwich'
        finished_orders.append(sandwich)

print('\n')

for sandwich in finished_orders:
    print('Order finshed: ' + sandwich + '.')