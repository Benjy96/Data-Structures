/**
 * Divide & Conquer Problem-solving Method:
 * 1. Base case
 * 2. Divide until base case
 * 
 * Base Case: 1 - sorted
 * Base Case: 2, 1 - return smaller value?
 * Divide Case: Anything over length of 2: Split until length <= 2
 * 
 */
function quickSort(array) {
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

    console.log("Pivot " + pivot + ", left " + left + " , right " + right);

    // Recursive Case: left + pivot + right
    // [] + 1 + [9,3,12,2,22]
        // TOP-LEVEL LEFT: []
        // TOP-LEVEL PIVOT: 1
        // TOP-LEVEL RIGHT: [3,2] + 9 + [12,22] ---> [2,3] + 9 + [12,22]
            // Left: [2,3]              BASE CASE RETURNS
            // Right: [12,22]           BASE CASE RETURNS
    return quickSort(left).concat(pivot, quickSort(right));
}

var unordered = [1,9,3,12,2,22];
console.log(quickSort(unordered));
