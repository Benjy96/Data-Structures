const {performance} = require('perf_hooks');
/**
 * Divide & Conquer Problem-solving Method:
 * 1. Base case
 * 2. Divide until base case
 * 
 * Base Case: 1 - sorted
 * Base Case: 2, 1 - return smaller value?
 * Divide Case: Anything over length of 2: Split until length <= 2
 * 
 * Worst Case Runtime: O(n^2)
 * Worst Case Space: O(n)
 * If the pivot is 0 (start of array), and array is already sorted, then:
 * At each level (n (or n-2) levels), you iterate through (roughly, avg 1/2 n) n elements
 * 
 * [1,2,3,4,5,6]
 * [] + 1 + [2,3,4,5,6] - Iterate through right to create new list
 * [] + 2 + [3,4,5,6]   - Iterate through right to create new list
 * [] + 3 + [4,5,6]     - Iterate through right to create new list
 * [] + 4 + [5,6]       - Base case, return ordered out of the 2
 * 
 * So for sorted array of 6 elements, you iterate through an array 4 times. We don't count the -2 or on average
 * half array size since it's a constant, giving n^2.
 * 
 * Average Case Runtime: O(n log(n))
 * At each level, we touch n elements.
 * If pivot is middle, we split log(n) times, instead of n like when pivot is 0.
 * So we touch n elements log(n) times. O(n) * O(log(n)) == O(n log(n))
 * 
 */
var numQSCalls = 0;
function quickSort(array) {
    numQSCalls++;
    // Base Case - nothing to sort
    if(array.length < 2) return array;

    // Base Case - Two elements
    if(array.length == 2) {
        var temp = 0;
        if(array[0] > array[1]) {
            temp = array[0];
            array[0] = array[1];
            array[1] = temp;
        }
        return array;
    }

    var pivotIndex = Math.floor(array.length / 2);
    var pivot = array[pivotIndex];
    var left = []
    var right = [];

    // Store elements bigger than pivot in right, smaller in left
    for(var i = 0; i < array.length; i++) {
        if(i == pivotIndex) continue;   // Skip next part of loop, don't need to compare pivot to pivot

        if(array[i] > pivot) {
            right[right.length] = array[i];
        }
        else {
            left[left.length] = array[i];
        }
    }

    // console.log("Pivot " + pivot + ", left " + left + " , right " + right);

    // Recursive Case: left + pivot + right
    // [] + 1 + [9,3,12,2,22]
        // TOP-LEVEL LEFT: []
        // TOP-LEVEL PIVOT: 1
        // TOP-LEVEL RIGHT: [2,3] + 9 + [12,22]
            // Left: [3,2]      BASE CASE LENGTH == 2, swaps and returns
            // Pivot: 9
            // Right: [12,22]   BASE CASE LENGTH == 2, returns
    return quickSort(left).concat(pivot, quickSort(right));
}

var numRandomPivotCalls = 0;
function quickSortRandomPivot(array) {
    numRandomPivotCalls++;
    // Base Case - nothing to sort
    if(array.length < 2) return array;

    // Base Case - Two elements
    if(array.length == 2) {
        var temp = 0;
        if(array[0] > array[1]) {
            temp = array[0];
            array[0] = array[1];
            array[1] = temp;
        }
        return array;
    }

    var pivotIndex = Math.floor(Math.random() * array.length);
    var pivot = array[pivotIndex];
    var left = []
    var right = [];

    // Store elements bigger than pivot in right, smaller in left
    for(var i = 0; i < array.length; i++) {
        if(i == pivotIndex) continue;   // Skip next part of loop, don't need to compare pivot to pivot

        if(array[i] > pivot) {
            right[right.length] = array[i];
        }
        else {
            left[left.length] = array[i];
        }
    }

    // console.log("Pivot " + pivot + ", left " + left + " , right " + right);

    // Recursive Case: left + pivot + right
    // [] + 1 + [9,3,12,2,22]
        // TOP-LEVEL LEFT: []
        // TOP-LEVEL PIVOT: 1
        // TOP-LEVEL RIGHT: [2,3] + 9 + [12,22]
            // Left: [3,2]      BASE CASE LENGTH == 2, swaps and returns
            // Pivot: 9
            // Right: [12,22]   BASE CASE LENGTH == 2, returns
    return quickSortRandomPivot(left).concat(pivot, quickSortRandomPivot(right));
}

var num0PivotCalls = 0;
function quickSort0Pivot(array) {
    num0PivotCalls++;
    // Base Case - nothing to sort
    if(array.length < 2) return array;

    // Base Case - Two elements
    if(array.length == 2) {
        var temp = 0;
        if(array[0] > array[1]) {
            temp = array[0];
            array[0] = array[1];
            array[1] = temp;
        }
        return array;
    }

    var pivot = array[0];
    var left = []
    var right = [];

    // Store elements bigger than pivot in right, smaller in left
    for(var i = 1; i < array.length; i++) {
        if(array[i] > pivot) {
            right[right.length] = array[i];
        }
        else {
            left[left.length] = array[i];
        }
    }

    // console.log("Pivot " + pivot + ", left " + left + " , right " + right);

    // Recursive Case: left + pivot + right
    // [] + 1 + [9,3,12,2,22]
        // TOP-LEVEL LEFT: []
        // TOP-LEVEL PIVOT: 1
        // TOP-LEVEL RIGHT: [2,3] + 9 + [12,22]
            // Left: [3,2]      BASE CASE LENGTH == 2, swaps and returns
            // Pivot: 9
            // Right: [12,22]   BASE CASE LENGTH == 2, returns
    return quickSort0Pivot(left).concat(pivot, quickSort0Pivot(right));
}

// SWITCH FOR WHICH LIST TO SORT
var unorderedTest = 0;

var unordered = [3,55,1,9,24,17,25,56,33,73,3,12,2,22,23,43,56,33,73,89,101,4,3,7,17,25,56,33,73,89,101,4,3,7,17,25,23,4,3,9,11,23,66,23,43,56,33,73,89,1,4,3,2,8,19,23,44,121];
var kindaOrdered = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,23,43,67,77,88,60,90,91,92,93,94,95,101,121,122,123,155,167,177,188,199,202,204,205,206,207,208,209,210,211,311,411,511,611,711,722,733,744,755];
console.log("Unordered Length: " + unordered.length);

var start = performance.now();
// console.log("Midway: " + quickSort(unordered));
if(unorderedTest) quickSort(unordered);
else quickSort(kindaOrdered);
var end = performance.now();
var midTime = end-start;
console.log("Midway time: " + midTime + "\n");

var start = performance.now();
// console.log("Random: " + quickSortRandomPivot(unordered));
if(unorderedTest) quickSortRandomPivot(unordered);
else quickSortRandomPivot(kindaOrdered);
var end = performance.now();
var randomTime = end-start;
console.log("Random time: " + randomTime + "\n");

var start = performance.now();
// console.log("0: " + quickSort0Pivot(unordered));
if(unorderedTest) quickSort0Pivot(unordered);
else quickSort0Pivot(kindaOrdered);
var end = performance.now();
var zeroTime = end - start;
console.log("0 time: " + zeroTime + "\n");

console.log("Num halfway pivot QS calls: " + numQSCalls);
console.log("Num random pivot QS calls: " + numRandomPivotCalls);
console.log("Num 0 pivot QS calls: " + num0PivotCalls);

console.log("\n");
if(unorderedTest) console.log("When list is completely unordered:");
else console.log("When list is mostly ordered:");
// No real consistent difference, 0 pivot seems faster most often
console.log("Random pivot quick sort is " + (randomTime / zeroTime) + " times the duration of 0 pivot quick sort");
// For ordered, with large array (40 elements+), mid pivot is better performance, whereas at 20, roughly same
// 20 log2 20 == 86
// 40 log2 40 == 212
// --- Big O Time For an ordered list:
// Mid pivot: n log n - we split the array in half n times, giving log n, and then iterate over n elements in total 
//            (to make new left/right arrays), giving n, which overall is n * log(n)
// 0 pivot: n^2 - we split the array n times, (as we are at 0, and split for 1, 2, .... 10, 11 ....) 
//          then iterate over n elements to create the new arrays, giving n*n, or n^2
// FOR EXAMPLE: ordered array of 8.
//  Mid pivot counts over n for 4 then 2
//  0 pivot counts over n for 7, then 6, then 5, then 4....
//      it is repeating counts over the same elements
console.log("Midway pivot quick sort is " + (midTime / zeroTime) + " times the duration of 0 pivot quick sort");



