const bitUtils = require("./bit-utils");

/**
 * Returns whether a bit at an index is a 0 or a 1.
 * Put a 1 in a position and compare against the other number's bits with a bitwise AND.
 * If the result is positive, then there will have been a 1 at the index specified, as all other
 * bits in both numbers will be 0, and if there are no 1s, the final integer will be 0.
 */
function getBit(num, i) {
    var detector = 1 << i;  // Puts a 1 in position i - all other bits will be 0
    var andResultRandomNum = num & detector;    // ANDs all bits in num against detector bits

    // If number is not 0, there was a 1 at the position we ANDed 
    if(andResultRandomNum != 0) return 1;
    else return 0;
}

function setBit(num, i) {

}

function clearBit(num, i) {

}

function updateBit(num, i) {

}

// Num (2): 0010
// I (1): 0001 -> 0010
// The answer should be 1, as there is a 1 at the 1 index (starting at 0, moving to the left)
console.log(getBit(2, 1));