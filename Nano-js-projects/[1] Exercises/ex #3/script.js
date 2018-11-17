var john = {
    name: 'John',
    mass: 110,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}
var mark = {
    name: 'Mark',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

if (john.calcBMI() > mark.calcBMI()) {
    console.log('John has a higher BMI that Mark ' + john.bmi + ' vs ' + mark.bmi + '.');
} else if (mark.bmi > john.bmi) {
    console.log('Mark has a higher BMI that John ' + mark.bmi + ' vs ' + john.bmi + '.');
} else {
    console.log('Same BMI!');
}