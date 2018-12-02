class Creature {
    constructor(sound) {
        this.sound = sound
    }

    talk() {
        console.log(this.sound)
    }
}

class Dino extends Creature {
    constructor() {
        super('Darling!')
    }
}

const myDino = new Dino()
myDino.talk()