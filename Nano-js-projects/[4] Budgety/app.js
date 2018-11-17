// ---------------------------------------------------------------------
// Budget Controller ---------------------------------------------------
// ---------------------------------------------------------------------

var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
        this.percentage = -1
    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage
    }

    var Income = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    var calculateTotal = function (type) {
        var sum = 0
        data.allItems[type].forEach(function (cur) {
            sum += cur.value
        })
        data.totals[type] = sum
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }


    return {
        addItem: function (type, des, val) {
            var newItem, ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }


            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else {
                newItem = new Income(ID, des, val)
            }
            data.allItems[type].push(newItem)
            return newItem
        },


        deleteItem: function (type, id) {
            var ids = data.allItems[type].map(function (current) {
                return current.id
            })
            var index = ids.indexOf(id)

            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            }
        },


        calculateBudget: function () {

            // 1. Total of all expenses and incomes
            calculateTotal('exp')
            calculateTotal('inc')

            // 2. Budget income - expenses
            data.budget = data.totals.inc - data.totals.exp

            // 3. Calc percentage
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            } else {
                data.percentage = -1
            }
        },

        calculatePercentage: function () {
            data.allItems.exp.forEach(function (current) {
                current.calcPercentage(data.totals.inc)
            })
        },

        getPercentage: function () {
            var allPerc = data.allItems.exp.map(function (current) {
                return current.getPercentage()
            })
            return allPerc
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }
    }
})()


// ---------------------------------------------------------------------
// UI Controller -------------------------------------------------------
// ---------------------------------------------------------------------

var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLable: '.budget__value',
        incomeLable: '.budget__income--value',
        expensesLable: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLable: '.item__percentage',
        dateLabel: '.budget__title--month',

    }

    var formatNumber = function(num, type) {
        num = Math.abs(num)
        num = num.toFixed(2)

        var numSplit = num.split('.')
        var int = numSplit[0]
        var dec = numSplit[1]

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
        }
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec
    }

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i)
        }
    }


    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {

            // Create HTML string
            var html, newHtml, element

            if (type === 'inc') {
                element = DOMStrings.incomeContainer

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                element = DOMStrings.expensesContainer

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }


            // Replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))


            //Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)

        },

        clearFields: function () {
            var feilds = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)
            var feildsArray = Array.prototype.slice.call(feilds)

            feildsArray.forEach(function (current) {
                current.value = ''
            })

            feildsArray[0].focus()
        },

        displayBudget: function (obj) {
            var type
            obj.budget > 0 ? type = 'inc' : type = 'exp'

            document.querySelector(DOMStrings.budgetLable).textContent = formatNumber(obj.budget, type)
            document.querySelector(DOMStrings.incomeLable).textContent = formatNumber(obj.totalInc, 'inc')
            document.querySelector(DOMStrings.expensesLable).textContent = formatNumber(obj.totalExp, 'exp')

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---'
            }
        },

        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercentageLable)

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%'
                } else {
                    current.textContent = '---'
                }
            })
        },

        displayMonth: function() {
            var now = new Date()
            var year = now.getFullYear()
            var months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
            ]
            var month = now.getMonth()
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year
        },

        changedType: function() {
            var feilds = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            )
            nodeListForEach(feilds, function(cur) {
                cur.classList.toggle('red-focus')
            })
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red')
        },

        getDOMStrings: function () {
            return DOMStrings
        }
    }
})()


// ---------------------------------------------------------------------
// Main Controller -----------------------------------------------------
// ---------------------------------------------------------------------

var controller = (function (budgetCtrl, UICtlr) {

    var settupEventListeners = function () {
        var DOMStrings = UICtlr.getDOMStrings()
        document.querySelector(DOMStrings.inputBtn).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem()
            }
        })
        document.querySelector(DOMStrings.container).addEventListener('click', ctrlDeleteItem)

        document.querySelector(DOMStrings.inputType).addEventListener('change', UICtlr.changedType)
    }


    var updateBudget = function () {
        // 1. Calc budget
        budgetCtrl.calculateBudget()

        // 2. Return budget
        var budget = budgetCtrl.getBudget()

        // 3. Display budget in UI
        UICtlr.displayBudget(budget)
    }

    var updatePercentage = function () {
        budgetCtrl.calculatePercentage()
        var percentages = budgetCtrl.getPercentage()
        UICtlr.displayPercentages(percentages)
    }


    var ctrlAddItem = function () {

        // 1. Add input
        var input = UICtlr.getinput()


        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            // 2. Add the item to the budget contorler
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value)

            // 3. Add item to UI
            UICtlr.addListItem(newItem, input.type)

            // 4. Clear input feilds
            UICtlr.clearFields()

            // 5. Calculate and update budget
            updateBudget()
            updatePercentage()
        }
    }


    var ctrlDeleteItem = function (event) {
        var itemID = event.target.parentNode.parentNode.parentNode.id
        if (itemID) {
            var splitID = itemID.split('-')
            var type = splitID[0]
            var id = parseInt(splitID[1])
            // 1. Delete from data
            budgetCtrl.deleteItem(type, id)

            // 2. Delete from UI
            UICtlr.deleteListItem(itemID)
            // 3. Update budget
            updateBudget()
            updatePercentage()
        }
    }


    return {
        init: function () {
            settupEventListeners()
            UICtlr.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            UICtlr.displayMonth()
        }
    }
})(budgetController, UIController)



controller.init()