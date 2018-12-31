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

const ZeroTwo = new Dino()
ZeroTwo.talk()