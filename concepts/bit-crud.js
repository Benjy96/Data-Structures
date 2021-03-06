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

/**
 * TL;DR: Sets the ith bit (from the right) to 1 in num's bits.
 * 
 * How? Sets a bit at index i in a "bit array" of all 0s to 1, then ORs that against the number "num".
 * All 1s/0s in original num kept, EXCEPT the new 1 at the specified index, i, as 1|1 == 1, and 1|0 == 1.
 */
function setBit(num, i) {
    var numWithOnlyBitToSet = 1 << i;   // Could also call a "Mask" to be placed over other number
    // in bitToSet, only 1 bit is 1. ORing both nums will result in old num with extra 1 if not already.
    return num | numWithOnlyBitToSet;
}

/**
 * TL;DR: Sets the bit at index i in num to 0
 * 
 * How? Makes a bit array of all 1s except for index. Compares that bit array vs num's bit array, and ANDs
 * the two arrays. All num's 1s kept, because 1&1 == 1, all num's 0s kept, because 1&0 == 0. And the new bit
 * at index i is 0, the & will result in a 0 (0&0 == 0)
 */
function clearBit(num, i) {
    // Would need to not affect other bits whether they are 0 or 1
    var allOnesExceptIndex = ~(1 << i);   // ~ inverses the bits (bitwise NOT), e.g., 0010 -> 1101

    // Compares all 1s (except bit to clear) against original num with a bitwise AND
    // All the 1 bits in num will be kept, as 1&1 = 1, and all 0s kept, as 1&0 = 0, and the i bit will be 0 too, as we
    // set it to 1 above and then inverted it
    return num & allOnesExceptIndex;
}

/**
 * TL;DR: Sets the ith bit in num to bitVal.
 * 
 * How? Creates a bit array of all 1s except for at the index i, which is set to 0.
 * ANDs num with this array to produce original number except at index i, which will be 0.
 * We now have original num with a cleared bit.
 * 
 * Then create a bit array of all 0s, and then move bitVal to index i, which could be 0 or 1.
 * OR the number with cleared bit against the new array, resulting in original number with the new bit at the index,
 * because num is 0 at index, and if index is 0, it will be 0. If index is 1, it will be 1, as 1 | 0 == 1.
 */
function updateBit(num, i, bitVal) {
    // For comments in this function, assume params: 1,1,1
    var allOnesExceptNewBitIndex = ~(1 << i);   // create a mask of 1s except for index to change, e.g.,    - 1101
    var numWithNewBitPositionCleared = num & allOnesExceptNewBitIndex; // 0001 & 1101 == 0001

    var desiredBitAtPosition = bitVal << i;    // set the desired position to 1 or 0, e.g.,       - 0010
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

// This function is saying to set the num in [] in 00[0]1 to 1
// 0011 is equal to 3
console.log(updateBit(1,1,1));
console.log(bitUtils.toBinary(updateBit(1,1,1)));

// #endregion
