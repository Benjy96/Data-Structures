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
    var numWithOnlyBitToSet = 1 << i;   // Could also call a "Mask" to be placed over other number
    // in bitToSet, only 1 bit is 1. ORing both nums will result in old num with extra 1 if not already.
    return num | numWithOnlyBitToSet;
}

function clearBit(num, i) {

}

function updateBit(num, i) {

}

// #region GET BIT
// Num (2): 0010
// I (1): 0001 << 1 --> 0010
// Function gets the bit at 1 index from the right, starting at 0, moving to the left
// Answer should be 1
console.log("--- GET BIT ---");
console.log(`The bit at index 1 from the right in 0010 is: ` + getBit(2, 1));

console.log(`The bit at index 0 from the right in 0010 is: ` + getBit(2, 0));   // Expect 0 (0010 <-)
console.log(`The bit at index 2 from the right in 0010 is: ` + getBit(2, 2));   // Expect 0 (00 <- 10)
console.log(`The bit at index 3 from the right in 0010 is: ` + getBit(2, 3));   // Expect 0 (0 <- 010)
// #endregion

// #region SET BIT
console.log("--- SET BIT ---");

// Num (1): 0001
// i (1): 0001 << 1 --> 0010
// 0010 | 0001 == 0011
console.log(setBit(1,1)); // Expect 3, since 0010 | 0001 == 0011
// #endregion
