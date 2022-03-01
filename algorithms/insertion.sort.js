/**
 * At each index of items, swaps current element with last element if last element smaller, and so on, until start of array.
 * Does this items.length (or indexToSortTo) number of times.
 * O(n^2) - nested loops are n^2
 */
function insertionSort(items, indexToSortTo) {
    if(items.length < 2) return;

    var j;

    // If array unsorted, j will go to 0 when sorting, and rest of array still needs sorted, so we have the
    // outer loop to keep resetting j, until we have gone through the whole array
    for(var i = 1; i < indexToSortTo; i++) {
        j = i;
        // if current index (j) is smaller than prior value, swap
        while(j > 0 && (items[j] < items[j-1])) {
            var smallerVal = items[j];
            items[j] = items[j-1];
            items[j-1] = smallerVal;

            j = j-1;
        }
    }
    return items;
}

var nums = [4,3,2,4];
console.log(insertionSort(nums, nums.length));  // Expect [2,3,4,4]