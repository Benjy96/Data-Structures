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
 *      Solve for simple case - 0 & 1 just return those numbers (since fib adds two nums at a time)
 *      Build solution for next case off prior case - what about when n is 3? Return prior number (-1) + prior 2nd number (-2)
 * 
 * 2 Approaches:
 * Bottom-up - build off each step
 * Top-down - split into subproblems/nodes
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

// Bottom-up is where you build off each result for next result
// Top-down is the other methods where you divide into subproblems (dividing into the recursive calls / nodes)
function bottomUpFib(n) {
    if(n == 0) return n;
    var a = 0;  // base case (first fib)
    var b = 1;  // base case (second fib)

    // start at first non-base case
    for(var i = 2; i < n; i++) {
        var c = a + b;  // current fib number

        // increment temp values to -1 and current fib
        a = b;
        b = c;
    }
    return a + b;
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

console.log("Bottom up Fib " + bottomUpFib(15));

/**
 * 
 * PROBLEM: Child running up staircase with n steps, and can either hop 1, 2, or 3 steps at a time. Implement
 *          a method to count how many possible ways the child can run up the stairs.
 * 
 *          i.e., 1 10x times is 1 way.
 * 
 * Lol, techically 3 "ways" to do it, as 1 or 2 or 3 at a time. What it means though is how many combinations of steps
 * can they take to get up the stairs, e.g., they may go 1, 3, 2, 1, 3, 2, until n reached.
 * 
 * How to solve?
 * 
 *  Combinations
 *  1+1+1....+1
 *  1+2+1+1....
 *  1+2+3+1+2+3
 * 
 *  How do we count all those?
 * 
 *  What is the base case? Length being reached
 * 
 */

// Runtime: O(3^n) - base 3 as 3 recursive calls (branches per node), where n is depth of call (num steps)
function numPossibleWaysToIncrementBetween(n) {
    if(n < 0) return 0;
    if(n == 0) return 1; // Base case - a "way" up
    // Why does this work?
    // n-1 will call n-1, n-1, n-1... == 1
    // n-1 will call n-1, n-2, n-3... == 1
    // Each function will call each other function down until the stairs are complete, and then return that "way"
    // Then finally, the sum of each number of ways will be returned
    return numPossibleWaysToIncrementBetween(n-1) + numPossibleWaysToIncrementBetween(n-2) + numPossibleWaysToIncrementBetween(n-3);
}

console.log("--- STAIR PROBLEM ---");
var n = 2;
console.log(numPossibleWaysToIncrementBetween(n) + " ways to go up " + n + " stairs");

// To memoize, you would need to store each step and ask if each prior step already been done with this step...?

function numWaysToIncrementBetweenMemod(n) {
    if(n < 1) return 1; // Base case - a "way" up

    return numWaysToIncrementBetweenMemod(n-1) + numWaysToIncrementBetweenMemod(n-2) + numWaysToIncrementBetweenMemod(n-3);
}