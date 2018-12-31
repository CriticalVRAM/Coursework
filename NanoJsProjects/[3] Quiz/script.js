(function () {
    function Question(question, questionAnswers, correctAnswer) {
        this.question = question
        this.questionAnswers = questionAnswers
        this.correctAnswer = correctAnswer
        this.logQuestion = function () {
            console.log('--------------------' + '\n' + this.question + '\n')
            questionAnswers.forEach(function (i) {
                console.log(i)
            })
        }
        this.checkAnswer = function () {
            if (userAnswer == this.correctAnswer) {
                console.log('Correct!')
                score += 1
                console.log('Current score ' + score)
            } else {
                console.log('Wrong! Try Again! :)')
                console.log('Current score ' + score)
            }
        }
    }

    var score = 0
    var userAnswer
    var questionOne = new Question('Is JavaScript a great language', ['0: Yes', '1: No'], 0)
    var questionTwo = new Question('Who is best girl for KLK', ['0: Ryuuko', '1: Satsuki', '2: Noona'], 1)
    var questionThree = new Question('Who is the best strategist', ['0: Sora', '1: Light', '2: Leolouch'], 2)
    var questionFour = new Question('How many hours have I spent playing Skyrim', ['0: Lots', '1: Plenty', '2: NOT ENOUGHT'], 2)
    var questions = [questionOne, questionTwo, questionThree, questionFour]

    nextQuestion()
    function nextQuestion() {
        var random = Math.floor(((Math.random()) * questions.length))
        var randomQuestion = questions[random]
        randomQuestion.logQuestion()
        userAnswer = prompt('Please input correct answer')
        if (userAnswer == 'quit') {
            console.log('--------------------' + '\n' + 'Final score ' + score)
            console.log('Thank you for playing!')
        } else {
            randomQuestion.checkAnswer(userAnswer)
            nextQuestion()
        }
    }
}())