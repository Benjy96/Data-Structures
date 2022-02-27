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
    // Would need to not affect other bits whether they are 0 or 1
    var allOnesExceptIndex = ~(1 << i);   // ~ inverses the bits (bitwise NOT), e.g., 0010 -> 1101

    // Compares all 1s (except bit to clear) against original num with a bitwise AND
    // All the 1 bits in num will be kept, as 1&1 = 1, and all 0s kept, as 1&0 = 0, and the i bit will be 0 too, as we
    // set it to 1 above and then inverted it
    return num & mask;
}

//Assume 1, 1, 1
function updateBit(num, i, bitVal) {
    var allOnesExceptNewBitIndex = ~(1 << i);   // create a mask of 1s except for index to change, e.g.,    - 1101
    var desiredBitAtPosition = bitVal << i;    // set the desired position to 1 or 0, e.g.,       - 0010

    var numWithNewBitPositionCleared = num & allOnesExceptNewBitIndex; // 0001 & 1101 == 0001

    return numWithNewBitPositionCleared | desiredBitAtPosition; // 0001 | 0010 == 0011
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

// #region CLEAR BIT
console.log("--- CLEAR BIT ---");

//i(2): 0001 << 2 -> 0100
//num:  1001
// ~ i -> 1011
//  1011 &     ~i
//  1001       num
//  ---------
//  1001
console.log(clearBit(9,2));
console.log(clearBit(9,0)); // Expect 1000 (8), as it will be 1110 & 1001 == 1000

// #endregion

// #region UPDATE BIT
console.log("--- UPDATE BIT ---");

// This function is saying to set 00[0]1 to 1
// 0011 is equal to 3
console.log(updateBit(1,1,1));
console.log(bitUtils.toBinary(updateBit(1,1,1)));

// #endregion
