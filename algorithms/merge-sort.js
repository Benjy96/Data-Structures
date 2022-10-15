const { Console } = require('console');
const {performance} = require('perf_hooks');

/**
Split a list into two halves and split those into two more halves repeatedly.
Once 2 elements, merge by looping length of both lists and taking value from smaller index value.

Runtime: O(n log n)
 */
function mergeSort(array) {
    // Roof Case - nothing to sort
    if(array.length <= 1) return array;

    var midIndex = Math.floor(array.length / 2);
    console.log("Mid Index: ", midIndex);

    // Repeat case - split each half into two more halves
    var leftList = mergeSort(array.slice(0, midIndex));
    var rightList = mergeSort(array.slice(midIndex, array.length));

    console.log("Left List: ", leftList);

    // Base Case - Actually sort each list (combine both halves)
    return merge(leftList, rightList);
}

function merge(leftList, rightList) {
    var sortedList = [];
    var leftIndex = 0;
    var rightIndex = 0;

    // Go over the two arrays as if they were one
    // Take and move pointer for list with smallest value
    for(var i = 0; i < leftList.length + rightList.length; i++) {
        // If not outside bounds of array
        if(leftIndex < leftList.length && rightIndex < rightList.length) {

            // If item at start of left is smaller than item at start of right, add to sorted list
            if(leftList[leftIndex] < rightList[rightIndex]) {
                sortedList.push(leftList[leftIndex]);
                leftIndex++;
            }
            // If item at start of right is smaller than item at start of left, add to sorted list
            else {
                sortedList.push(rightList[rightIndex]);
                rightIndex++;
            }
        }
        // If reached end of left list, add elements from right list as they're all that's left
        else if(leftIndex == leftList.length) {
            sortedList.push(rightList[rightIndex]);
            rightIndex++;
        }
        // If reached end of right list, add elements from left list as they're all that's left
        else if(rightIndex == rightList.length) {
            sortedList.push(leftList[leftIndex]);
            leftIndex++;
        }
    }

    return sortedList;
}

var unordered = [3,55,1,9,24,17,25,56,33,73,3,12,2,22,23,43,56,33,73,89,101,4,3,7,17,25,56,33,73,89,101,4,3,7,17,25,23,4,3,9,11,23,66,23,43,56,33,73,89,1,4,3,2,8,19,23,44,121];
var kindaOrdered = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,23,43,67,77,88,60,90,91,92,93,94,95,101,121,122,123,155,167,177,188,199,202,204,205,206,207,208,209,210,211,311,411,511,611,711,722,733,744,755];

console.log(mergeSort(unordered));

