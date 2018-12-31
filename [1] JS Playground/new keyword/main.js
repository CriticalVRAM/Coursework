function Person(saying) {
    this.saying = saying
}

Person.prototype.talk = function() {
    console.log(this)
}

// spawn
function spawn(constructor) {
    // Make new empty object
    const obj = {}
    // Set prototype of new obj to constructors prototype
    Object.setPrototypeOf(obj, constructor.prototype)
    // Execute constructor with 'this' || not sure how but this line just adds the properties
    // This works too -- Array.prototype.slice.apply(arguments).slice(1)
    constructor.apply(obj, Array.from(arguments).slice(1))
    // return obj
    return obj
}


const ancestorSpawn = spawn(Person, 'Regroup. reasemble. Evil is timeless after all.')
const ancestorNew = new Person('We fall so that we may learn to pick ourselfs up one again.')

ancestorSpawn.talk()
ancestorNew.talk()