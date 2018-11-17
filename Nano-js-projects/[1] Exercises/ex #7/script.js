function r_rn(p, n) {
    var r = (p/100 + 1)
    var rn = Math.pow(r, n)
    return [r, rn]
}


function zajam(a) {
    var r = r_rn(1.5, 32)[0]
    var rn = r_rn(1.5, 32)[1]
    // res
    var z = ((a * (rn - 1)) / (rn * (r - 1)))
    return Math.round(z * 100) / 100
}

function anuitet(z) {
    var r = r_rn(3, 24)[0]
    var rn = r_rn(3, 24)[1]
    //res
    var a = ((rn * (r - 1)) / (z * (rn - 1)))
    console.log(a)
}