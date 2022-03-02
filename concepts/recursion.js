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

// Memoization - Caching. What if we've already calculated the fib value? Why redo?
// How to store? Key: Fib n (stage). Value: Result of that node's continuation.
var fibMap = new Map();

var numNodesMemo = 0;
// n == 4
function fibonacciMemo(n) {
    numNodesMemo++;
    if(n == 0) return 0;
    if(n == 1) return 1;

    // If we have already calculated the fib for this stage, return it
    if(fibMap.get(n)) return fibMap.get(n);

    // Notice each x + x as a node counts up to 8, and then + 1 for root node is 9 == 2^n + 1
    // return 3 + 2
        // Left: return 2 + 1
            // Left: return 1 + 0   == 1
            // Right:               == 1
        // Right: return 1 + 0      == 1
    fibMap.set(n, fibonacciMemo(n-1) + fibonacciMemo(n-2));
    return fibMap.get(n);
}

// This version handles map internally
function fibonacciMemoV2(n, map) {
    if(n == 0 || n == 1) return n;

    // If fib branch already calculated, return
    if(map.get(n)) return map.get(n);

    // Else calculate and cache
    map.set(n, fibonacciMemoV2(n-1, map) + fibonacciMemoV2(n-2, map));
    return map.get(n);
}

function fibonacciV2(n) {
    return fibonacciMemoV2(n, new Map());
}

console.log(fibonacciMemo(4));
console.log("Nodes generated: " + numNodesMemo);

var numNodes = 0;
function fibonacci(n) {
    numNodes++;
    if(n == 0) return 0;
    if(n == 1) return 1;

    return fibonacci(n-1) + fibonacci(n-2);
}

console.log("----- MEMOIZATION -----");

console.log(fibonacci(15));
console.log("Normal fibonacci Nodes generated: " + numNodes);   // 1973 nodes

numNodesMemo = 0;
console.log(fibonacciMemo(15));
console.log("Memo Fib Nodes generated: " + numNodesMemo);   // 23 nodes !!!!!

console.log("Memo Fib w/ Internal Map: " + fibonacciV2(15, new Map()));