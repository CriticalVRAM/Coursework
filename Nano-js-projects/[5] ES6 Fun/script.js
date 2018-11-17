console.log('----------\nPARKS\n----------')
class Park {
    constructor(age, size, trees) {
        this.age = age
        this.size = size
        this.trees = trees
        this.treeDensity = this.trees / this.size
    }
}

var parks = new Map()
parks.set('Green Park', new Park(70, 547, 684))
parks.set('Oak Park', new Park(80, 867, 965))
parks.set('National Park', new Park(73, 1245, 2546))


for (let [key, value] of parks.entries()) {
    console.log(`${key} has a tree density of ${Math.round(value.treeDensity * 100) / 100}`)
}

for (let [key, value] of parks.entries()) {
    if (value.trees > 1000) {
        console.log(`${key} has more than a 1000 trees`)
    }
}

var totalAge = 0
parks.forEach((value) => {
    totalAge += value.age
})
console.log(`The average age of our parks is ${Math.round((totalAge / parks.size * 100) / 100)} years`)



console.log('----------\nSTREETS\n----------')



class Street {
    constructor(year, lenght, sizeClass = 'normal') {
        this.year = year
        this.lenght = lenght
        this.sizeClass = sizeClass
    }
}

var streets = new Map()
streets.set('Ocean Avenue', new Street(1999, 1.75, 'big'))
streets.set('Evergreen Street', new Street(2008, 2.75, 'small'))
streets.set('4th Street', new Street(2015, 2.15))
streets.set('Sunset Boulevard', new Street(1982, 2.15, 'huge'))

for (let [key, value] of streets.entries()) {
    console.log(`${key}, built in ${value.year}, is a ${value.sizeClass} street.`)
}

var totalLenght = 0
streets.forEach((value) => {
    totalLenght += value.lenght
})

console.log(`Our ${streets.size} streets have a total of ${totalLenght}km, with an average of ${Math.round((totalLenght / streets.size * 100) / 100)}km.`)