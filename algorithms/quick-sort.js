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

var unordered = [1,9,24,3,12,2,22,23,43,56,33,73,89,101,4,3,7,17,25,23,4,3,9,11,23,66];
console.log("Midway: " + quickSort(unordered));
console.log("Random: " + quickSortRandomPivot(unordered));
console.log("0: " + quickSort0Pivot(unordered));

console.log("Num halfway pivot QS calls: " + numQSCalls);
console.log("Num halfway random pivot QS calls: " + numRandomPivotCalls);
console.log("Num 0 pivot QS calls: " + num0PivotCalls);


