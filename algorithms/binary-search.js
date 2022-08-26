/**
Lets you search a sorted list in O(log n) time.
Why? Binary search halves the input with each iteration. A logarithm is the opposite of an exponent.
------
To run this test, type "node binary-search.js" into your console in this directory.

Problem: Given a sorted array of distinct integers and a target value, return the index if the target is found. 
If not, return the index where it would be if it were inserted in order.

Input: nums = [1,3,5,6], target = 5
Expected Output: 2

Input: nums = [1,3,5,6], target = 7
Expected Output: 4

 */

function test() {
    // Check 5 is at index 2
    var test1 = (SearchInFor([1,3,5,6], 5) == 2) ? "Pass" : "Fail";
    // Check 7 is outside length of array
    var test2 = (SearchInFor([1,3,5,6], 7) > [1,3,5,6].length - 1) ? "Pass" : "Fail";

    var nums = [1,2,3,5,6,7,8,9,14,21,57,73,101,151,200,201,202];
    var recursiveTest = (recursiveBinarySearch(nums, 7, 0, nums.length) == 5) ? "Pass" : "Fail";

    console.log(test1);
    console.log(test2);
    console.log("Recursive test: " + recursiveTest);
}

/**
 * Binary Search algorithm.
 * Halves the sorted array from the midpoint until the target is found.
 * 
 * For example, if you are searching a huge dictionary for a word, you could go to the halfway point,
 * see if your target word "Jurassic" beginning with J is before or after the middle letter, let's say L. If it's smaller (it is),
 * then search the first half of the dictionary, throwing the first half away.
 * 
 * 1,2,3,4,5,6,7,8,9,10 -- Find 7
 * Left 1, Right 10, Half 5
 * Target bigger than half (5)
 * Set Left 5, Right 10
 * Target smaller than half 8
 * Set Left 5, Right 7
 * Target bigger than half 6
 * Set Left 7, Right 7
 * 
 * If midpoint is target, return midpoint index
 * Else if midpoint is bigger than target, slide left to midpoint + 1
 * Else if midpoint is smaller than target, slide right to midpoint - 1
 * @param {*} nums - ordered array of numbers
 * @param {*} target - number to find in the ordered array
 * @returns 
 */
function SearchInFor(nums, target) {
    var left = 0;
    var half = 0;
    var right = nums.length;
    var length = 0;

    while(left <= right) {
        length = right - left;
        half = Math.floor(left + (length/2));

        // if halfway index (adjusted for 0-based numbering) exceeds array, return left pointer
        if(half + 1 > nums.length) return left;

        // If midpoint equals target, return index of target
        if(nums[half] == target) return half;

        // If midpoint bigger than target, move pointers down to the left (take left side of array)
        if(nums[half] > target) right = half-1;

        // If midpoint smaller than target, move pointer to the right (take right side of array)
        if(nums[half] < target) left = half+1;
    }
    // base case return left, as left will be the pointer to end on final value because the while loop
    // terminates once left > right
    return left;
}

function recursiveBinarySearch(nums, target, left, right) {
    // Base Case - if target in middle
    var midpoint = Math.floor(((right - left) / 2)) + left;
    if(nums[midpoint] == target) return midpoint;

    // Base Case - no match
    if(left >= right) return null;

    // Recursive cases - set new left/right of array
    // target in left side of array
    if(nums[midpoint] > target) {
        // set right
        right = midpoint;
        return recursiveBinarySearch(nums, target, left, right);
    }
    // target in right side of array
    else {
        // set left
        left = midpoint;
        return recursiveBinarySearch(nums, target, left, right);
    }
}

test();