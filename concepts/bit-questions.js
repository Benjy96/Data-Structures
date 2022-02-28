const bitUtils = require("./bit-utils");

/**
 * Inserts M into N, starting at bit j, and ending at bit i.
 * @param {*} N 32 bit number (bigger num)
 * @param {*} M 32 bit number (smaller num)
 * @param {*} i ending bit position
 * @param {*} j starting bit position
 */
function q1(N, M, j, i) {
    var mask = 0;
    //1. Clear N at j-i
    for(var x = i; x <= j; x++) {
        var singleOneToLeft = 1 << x;
        mask = mask | singleOneToLeft;  // In a bit array of all 0s, shift a 1 x places to the left from the right
    }

    // Mask is now all 0s except j-i, which are 1 (as we inserted 1, and left shift fills remainder as 0)
    // Invert, so that everything is 1 except j to i, which will be 0
    mask = ~mask;   

    // We now have an array of all 1s except for j-i. This is N without j-i.
    // All 1s from N kept, as mask is all 1s, except j-i. j-i will be 0, as 1&0 == 0.
    var nWithoutJtoI = N & mask;

    // N is something like 1111000011, as we cleared 6-2
    // The end of M's actual values will be at N's 1 and 0 indices. We don't want to compare those.
    // So move M i places to the left, leaving 0s in their place (left shift leaves 0s from right)
    // This then gives something like M == 10011[00]
    var mWithoutBitsBeyondI = M << i;

    //2. Bitwise OR N and M
    return nWithoutJtoI | mWithoutBitsBeyondI;
}

function q1BookVersion(N, M, j, i) {
    //1. Clear N at j-i
    var allOnes = ~0;

    // bit array of all ones, excepts 0s from jth position onwards (Lshift fills with 0s) (111100000)
    var left = allOnes << (j+1);    

    // bit array of all 0s, except 1s from ith position onwards (0000011)
    var right = 0;
    for(var x = 0; x < 2; x++) {
        right = right | (1 << x);
    }

    // Combine left and right for the 11100011 mask
    var mask = left | right;

    // Now clear N at mask positions (Mask is 1 everywhere N is 1, except in mask positions, so and keeps N except mask 0s)
    N = N & mask;

    // Put m into correct position
    M = M << i;

    //2. Bitwise OR N and M (will keep old N values and put M in wherever N has been cleared by mask)
    return N | M;
}

/**
 * Question: Write a function that inserts one binary array (M) into another (N) at positions j to i.
 * How to solve?
 * Clear N at j-i indices. OR N and M.
 * Mistake I made: I didn't realise I had to shift M to the left
 * 
 * How did I do it differently from the book?
 * 
 * 1. Book did some kind of fancy subtraction thing to make right side of array, I just used
 * a for loop to shift the bits multiple times - makes more sense that way to me.
 * 
 * 2. Book combined a left and right half of mask. I just made a single mask with a for loop and inverted the mask.
 */
console.log("Result: " + bitUtils.toBinary(q1(0b10000000000, 0b10011, 6, 2))); // Expect 10001001100
console.log("Result: " + bitUtils.toBinary(q1BookVersion(0b10000000000, 0b10011, 6, 2))); // Expect 10001001100

