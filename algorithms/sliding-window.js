/**
 * Lets you find substrings.
 * --------
 * Problem: Get longest substring with unique characters only.
 * 
 * What do we need to do at the most basic level?
 * - Move right to record length of unique substrings
 * - Move left to separate substrings and record length of unique substrings
 *      - To separate substrings: 
 *          - Move left once duplicate character found
 *          - Stop moving left pointer once same type as duplicate found, as that will be next substring
 * 
 * Questions:
 * Do the characters that aren't duplicated in a single string ever go below 0?
 *      Intermediate chars never go below 0, as incremented each time seen afterwards
 * 
 * Why not just decrement the character we're at (the duplicate) instead of all of them, and set left
 * to the value right away?
 *      If the same character is repeated twice, but not in same substring, then it will go over 1, to 2+, as if
 *      it were duplicated IN THE SAME substring, which would be incorrect.
 * 
 */

var example = "accaccacc";   // Longest substring should be 2 - ac
console.log("The longest substring in " + example + " is " + longestSubstring(example));
// -----  -----   VISUALISATION   -----  ----- //
//      a   c   c   a   c   c   a   c   c
/**     0   1   2   3   4   5   6   7   8       LOOPS
 * a    l   l
 * c                        
 * c            l   l                              
 * a                    l            
 * c                           
 * c                        l   l
 * a                                l             
 * c
 * c                                    l
 */
// -----  -----  -----   -----   -----  ----- //
/**
 * STEPS:
 * 1. Move right +1 each loop until end of string:
 *      1.1 Increment num times char at right has been seen
 *      1.2 While char at right has been seen >1 times:
 *          1.2.1 Decrement num times char at left (l) has been seen
 *          1.2.2 Move left +1
 *      1.3 Record longest sub string from last one and (right-left)+1
 * 2. Return longest sub string
 */

function longestSubstring(string) {
    var longestSubstring = 0;
    var chars = [];

    var left = 0;
    var right = 0;

    while(right < string.length) {
        var currentChar = string[right].charCodeAt(0);

        // Count num times the rightmost character has been seen
        if(!chars[currentChar] > 0) chars[currentChar] = 0;
        chars[currentChar]++;      

        // Decrement each character up to a char the same as the duplicate. 
        // This prevents other characters going over 1 and flagging themselves as a duplicate within 
        // a single substring, while also setting the left pointer to the start of the next substring.
        while(chars[currentChar] > 1) {
            var priorChar = string[left].charCodeAt(0);
            chars[priorChar]--;

            left++;
        }
        // console.log("Right at " + right + " " + string[right] + "(" + chars[currentChar] + ")" + ", Left up to " + left + " " + string[left] + "(" + chars[string[left].charCodeAt(0)] + ")");

        // Store the longest substring as of yet
        // +1 is because we increment left before measuring, so need to increase length by 1
        longestSubstring = Math.max(longestSubstring, (right-left)+1);

        right++;
    }
    return longestSubstring;
}