/**
 * Runtime: O(n^2).
 * 
 * Iterates through a list to find the largest/smallest element in a list, places it in a new list, and repeats.
 * It will iterate (roughly) n times through the (decreasing) list n times. 
 * (Runtime is technically O(n * 1/2 * n), but we drop constants.)
 * 
 * Steps:
 * 1. For each item in list:
    * Iterate through list
    *      Record biggest
    *      Record biggest pos
    * Delete biggest from original list
    * Store biggest in new list
 */
function selectionSort(list) {

    var sortedList = [];
    var reducingList = list.slice();    // clones array instead of assigning pointer
    var biggestSeen = 0;
    var biggestPos = 0;

    // 1. For each item in list
    for(var i = 0; i < list.length; i++) {
        // 1.1 For each item in reducing list
        for(var j = 0; j < reducingList.length; j++) {
            if(reducingList[j] > biggestSeen) {
                biggestSeen = reducingList[j];
                biggestPos = j;
            }
        }
        // remove biggest element seen and reset
        reducingList.splice(biggestPos, 1);
        biggestSeen = 0;
        sortedList[i] = biggestSeen;
    }
    return sortedList;
}

var list = [1,7,2,10,17,13,2];
console.log(selectionSort(list));