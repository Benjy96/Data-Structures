const bitUtils = require("./bit-utils");

/**
 * Shifts x to the right count times, but will not change the sign bit (will stay pos or neg)
 * Fills in new bits with the value of the sign bit, meaning the sign bit will not change.
 * e.g., 1011 >> 1 == 1101
 */
function repeatedArithmeticShift(x, count) {
    for(var i = 0; i < count; i++) {
        // Signed right shift (>>) shifts left-side (x) by right-side (1) to the right
        // The sign bit will not change
        x >>= 1;
    }
    return x;
}

/**
 * Shifts x to the right count times. Results in a positive each time
 * Fills in new bits with 0 each time, which is why sign bit will be 0 with any shift.
 * e.g., 1011 >> 1 == 0101
 */
function repeatedLogicalShift(x, count) {
    for(var i = 0; i < count; i++) {
        // Unsigned right shift (>>>) shifts left-side (x) by right-side (1) to the right
        // 0 bits are shifted in from left, meaning the sign bit will become 0 (positive)
        x >>>= 1;
    }
    return x;
}

var x = -93242;
var count = 40;
console.log(`Arithmetic right shifting ${x} ${count} times: ` + repeatedArithmeticShift(x, count));
console.log(`Logical right shifting ${x} ${count} times: ` + repeatedLogicalShift(x, count));

/**
 * Shifts the bits of num i bits to the left, filling in 0s from the right
 */
function LeftShift(num, i) {
    num = num << i;
    return num;
}

console.log(`Left shifting 111...111 3 times: ` + bitUtils.toBinary(LeftShift(~0, 3)));
