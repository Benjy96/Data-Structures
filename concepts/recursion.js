/**
 * 
 * Problem: Compute the nth fibonacci number.
 * 
 * What is fibonacci sequence? Each number is sum of prior two numbers.
 * 
 * Fib: 0, 1, 1, 2, 3, 5 ...
 * n:   0, 1, 2, 3, 4, 5            
 * 
 * How to solve?
 * Bottom-up:
 *      Solve for simple case - 0 & 1 just return those numbers (since fib adds two nums at a time)
 *      Build solution for next case off prior case - what about when n is 3? Return prior number (-1) + prior 2nd number (-2)
 * Top-down
 * 
 * -------
 * 
 * Space Complexity: O(n) - depth of tree, as call stack will go down one branch at a time, and each branch does at most n deep
 * Time Complexity: O(2^n) - base two as each node has potentially 2 children (recursive calls), and goes to power of n as
 *                          that is how many levels deep we go
 * 
 * Num nodes will be roughly 2^n + 1 (as root node). But drop the +1 as not a dominant factor in rate of increase.
 * 
 */

var numNodes = 0;
// n == 4
function fibonacci(n) {
    numNodes++;
    if(n == 0) return 0;
    if(n == 1) return 1;

    // Notice each x + x as a node counts up to 8, and then + 1 for root node is 9 == 2^n + 1
    // return 3 + 2
        // Left: return 2 + 1
            // Left: return 1 + 0   == 1
            // Right:               == 1
        // Right: return 1 + 0      == 1
    return fibonacci(n-1) + fibonacci(n-2);
}

console.log(fibonacci(4));
console.log("Nodes generated: " + numNodes);