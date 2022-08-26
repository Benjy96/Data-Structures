/**
 * 
 * Given two arrays A and B, check whether B is a subarray of A.
 * 
 * Input : A[] = {2, 3, 0, 5, 1, 1, 2}, B[] = {3, 0, 5, 1} 
 * Output : Yes
 * Input : A[] = {1, 2, 3, 4, 5}, B[] = {2, 5, 6} 
 * Output : No 
 * 
 */

/**
 * CTCI Prob Solving:
 * 
 * 1. Listen Carefully
 * 2. Draw large general case
 * 3. Brute Force
 * 4. Optimise
 * 5. Step through before coding
 * 6. Code
 * 7. Double Check
 * 
 */

/** 2 - Draw Example General Case
 * 
 * A: 2, 3, 0, 5, 1, 2, 3
 * B: 1, 2
 * 
 * 2 == b[0]? No, 3 == B[0]? No, ... 1 == B[0]? Yes
 * 2 == b[1]? Yes
 * 
 * 
 * Solution is to loop A until B match, then loop A and B simultaneously.
 * 
 * Loop through A checking B at each step
 * If match B, increment B as well as A and continue, else if next doesn't match reset B position
 * If length of B reached, return true
 * Else if end of A and not reached end of B, return false
 * 
 * 
 */



function isSubarray(array1, array2) {

    var b = 0; // tracks position in b

    // Go through a, checking b at each step
    for(var a = 0; a < array1.length; a++){
        if(array1[a] == array2[b]) {
            b++;
        } else {
            b = 0;
        }

        if(b == array2.length - 1) {
            return true;
        }
    }
    // We reached end of a but length of b was never reached
    return false;
}

var array1 = [2, 3, 0, 5, 1, 1, 2];
var array2 = [3,0,5,1]
console.log("Expecting True. Is:", isSubarray(array1, array2));

array1 = [2, 3, 0, 5, 1, 1, 2];
array2 = [2,5,6];
console.log("Expecting False. Is:", isSubarray(array1, array2));