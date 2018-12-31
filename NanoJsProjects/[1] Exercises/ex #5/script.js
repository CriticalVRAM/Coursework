function interview(job) {
    var designerQuestion = ' can you please explain what UX design is?'
    var devQuestion = ' can you please explain the difference between ES5 and ES2017?'
    return function (name) {
        if (job === 'designer') {
            console.log(name + designerQuestion)
        } else if (job === 'dev') {
            console.log(name + devQuestion)
        }
    }
}

interview('designer')('Bill')
interview('dev')('Bob')