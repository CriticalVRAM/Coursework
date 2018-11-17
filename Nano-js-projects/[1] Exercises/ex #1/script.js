function average(team) {
    var total = 0;
    team.forEach(function(item){
        total = total + item;
    });
    total = total / team.length;
    return total;
}

var bill = [89, 120, 103];
var mike = [116, 94, 123];
var mary = [97, 134, 105];

var bill = average(bill);
var mike = average(mike);
var mary = average(mary);

if (bill > mike && bill > mary) {
    console.log("Bill's team won with a score of " + bill + ". Compared to the other scores of " + mike + " and " + mary + ".");
} else if (mike > bill && mike > mary) {
    console.log("Mike's team won with a score of " + mike + ". Compared to the other scores of " + bill + " and " + mary + ".");
} else if (mary > bill && mary > mike) {
    console.log("Mary's team won with a score of " + mary + ". Compared to the other scores of " + bill + " and " + mike + ".");
} else {
    console.log("It was a draw!!!");
}