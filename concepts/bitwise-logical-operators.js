/**
 * Bitwise logical operators compare each bit of a number, where the bits are the binary representation
 * of a decimal integer you assign. This can be useful for creating bitwise arrays/vectors, which allow you
 * to store true/false (1/0) values inside a single integer, taking up less space than an array of integers
 * would.
 * 
 * If you make an int, 1, that is 0001 in binary. If you have two of those and compare with a bitwise OR, it will
 * compare each bit, and if either is a 1, the result will have a 1 where EITHER had a 1.
 * 
 * 0000 - 0 
 * 0001 - 1
 * 0010 - 2
 * 0011 - 3
 * 0100 - 4
 */

var a = 1;  // ... 0001
var b = 2;  // ... 0010

console.log(toBinary(a) + "\n" + toBinary(b) + "\n ----");
console.log("Bitwise OR (Either 1 to be 1): " + (a | b)); // ... 0011, or 3
/**
 * 0001
 * 0010
 * ---- |
 * 0011
 */


console.log("Bitwise AND (Both 1 to be 1): " + (a & b)); // ... 0000, or 0
/**
 * 0001
 * 0010
 * ---- &
 * 0000
 */


console.log("Bitwise XOR (Either 1 but not both 1 to be 1): " + (a ^ b)); // ... 0011, or 3
/**
 * 0001
 * 0010
 * ---- ^
 * 0011
 */

