favorite_languages = {
    'jen': 'python',
    'sarah': 'c++',
    'edward': 'ruby',
    'phil': 'python',
    'jibly': 'blood +'
}

people_who_did_not_take_the_poll = ['sajtama', 'geralt', 'shiro']

for person, fav_lang in favorite_languages.items():
        print(person.title() + "'s favorite language is:")
        print(fav_lang.title() + '.\n')

for pep in people_who_did_not_take_the_poll:
        print(pep.title() + ' ' + 'please take our poll!\n')