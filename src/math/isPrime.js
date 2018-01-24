function solution1(num) {
    if(isNaN(num) || num <= 1 || num % 1) {
        return false;
    }
    if(num === 2) {
        return true;
    }
    if(num % 2 === 0) {
        return false;
    }

    for(let i = 3; i <= num / 3; i += 2) {
        if(num % i === 0) {
            return false;
        }
    }

    return true;
}

// optimized
function solution2(num) {
    if(num === 2) {
        return true;
    }
    if(isNaN(num) || num <= 1 || num % 1 || num % 2 === 0) {
        return false;
    }

    // reduce exit condition as x increases
    for(let x = 3; x <= num / x; x += 2) {
        if(num % x === 0) {
            return false;
        }
    }

    return true;
}

module.exports = {
    constants: {},
    solutions: [
        solution1,
        solution2,
    ],
};
