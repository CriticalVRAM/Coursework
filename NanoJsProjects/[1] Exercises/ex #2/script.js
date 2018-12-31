var bills = [124, 48, 268, 180, 42];
var billsMark = [77, 475, 110, 45];

function tipCalculator(bills) {
    var tipFinal = [];
    var costFinal = [];
    bills.forEach(function(bill) {
        function calc(bill, prct) {
            var tipCalc = bill * prct/100;
            tipFinal.push(tipCalc);
            var costCalc = bill + tipCalc;
            costFinal.push(costCalc);
        };
        if (bill < 50) {
            calc(bill, 20);
        } else if (bill > 200) {
            calc(bill, 10);
        } else {
            calc(bill, 15);
        };
    });
    var final = {
        tips: tipFinal,
        cost: costFinal
    }
    return final;
};


var markBills = {
    tipFinalMark: [],
    costFinalMark: [],
    calc: function() {
        billsMark.forEach(function(bill) {
            function calc(bill, prct) {
                var tipCalc = bill * prct/100;
                markBills.tipFinalMark.push(tipCalc);
                var costCalc = bill + tipCalc;
                markBills.costFinalMark.push(costCalc);
            };
            if (bill < 100) {
                calc(bill, 20);
            } else if (bill > 300) {
                calc(bill, 25);
            } else {
                calc(bill, 10);
            };
        });
        var finalMark = {
            tips: markBills.tipFinalMark,
            cost: markBills.costFinalMark
        }
        return finalMark;
    }
};

// Runs function to return objects
var finalObject = tipCalculator(bills);
var finalMarkObject = markBills.calc();

// Calcs total from objects.tips
var finalTotal = finalObject.tips.reduce((a, b) => a + b, 0);
var finalMarkTotal = finalMarkObject.tips.reduce((a, b) => a + b, 0);

function average(total, object) {
    var number = object.tips.length;
    var total = total / number;
    return total
}

// Calcs average form total and objects.tips.length
absolute = average(finalTotal, finalObject);
absoluteMark = average(finalMarkTotal, finalMarkObject);

console.log(absolute);
console.log(absoluteMark);

if (absolute > absoluteMark) {
    console.log("John's tips more!")
} else {
    console.log("Mark's tips more!")
}