function isPrime(num) {
    if(isNaN(num) || num <= 0 || num % 1) {
        return false;
    }
    if(num === 1 || num === 2) {
        return true;
    }
    if(num % 2 === 0) {
        return false;
    }

    for(var i = 3; i <= num / 3; i += 2) {
        if(num % i === 0) {
            return false;
        }
    }

    return true;
}

module.exports = {
    constants: {},
    solutions: [
        isPrime,
    ],
};
