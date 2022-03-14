/**
Lets you search a sorted list in O(log n) time.
------
To run this test, type "node binary-search.js" into your console in this directory.

Problem: Given a sorted array of distinct integers and a target value, 
return the index if the target is found. 
If not, return the index where it would be if it were inserted in order.

Input: nums = [1,3,5,6], target = 5
Expected Output: 2

Input: nums = [1,3,5,6], target = 7
Expected Output: 4

*****
Solution runtime: O(Log N)
Why? Binary search halves the input with each iteration. A logarithm is the opposite of an exponent.
 */

function test() {
    var test1 = (SearchInsert([1,3,5,6], 5) == 2) ? "Pass" : "Fail";
    var test2 = (SearchInsert([1,3,5,6], 7) == 4) ? "Pass" : "Fail";

    var nums = [1,2,3,5,6,7,8,9,14,21,57,73,101,151,200,201,202];
    var recursiveTest = (recursiveBinarySearch(nums, 7, 0, nums.length) == 5) ? "Pass" : "Fail";

    console.log(test1);
    console.log(test2);
    console.log("Recursive test: " + recursiveTest);
}

function SearchInsert(nums, target) {
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
    // base case return left, as left will be the pointer to end on final value as while loop
    // terminates once left exceeds right
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