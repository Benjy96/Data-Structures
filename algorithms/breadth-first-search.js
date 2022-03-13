/**
 * Method to find shortest distance between two things. Applicable Problems:
 * Shortest Path & Existence in network:
 * - Fewest edits from misspelling to real word
 * - Doctor closest to you in your network
 * - Fewest moves to victory in chess
 * - Is there a GPU seller your network?
 * 
 * ----------------
 * Implementation:
 * 1. Queue of nodes
 * 2. For each first node in queue:
    * 2.1. If node meets condition, done
    * 2.2. Else add all node's neighbours to queue
 * 3. If empty, no nodes in network meeting condition
 */

var map = new Map();
map.set("Ben", ["Bob", "Alice"]);
map.set("Alice", ["Jane", "Omega"]);
map.set("Omega", ["Rachel", "Timothy"]);

/**
 * Searches for a node in a graph, a layer at a time.
 * Nodes directly connected to the start node are the first layer.
 * Nodes connected to a node which are directly connected to the start node are the second layer, and so on.
 * 
 * Pattern/Essence: Add each layer of graph to a queue and iterate through the queue.
 */
function breadth_first_search(map, start, searchItem) {
    // 1. Queue of nodes
    var queue = map.get(start).slice(); //.slice copies array rather than giving the reference
                                        //If we get ref, we will modify the map when using queue.shift, etc

    // 2. For each (first) node in queue:
    while(queue.length > 0) {
        var item = queue.shift();   // This is modifying the map

        // 2.1 If first node is what we're looking for, done
        if(item == searchItem) return item + " is in the graph/network";

        // 2.2. Else add all of this node's neighbours to the queue
        var nodeFriends = map.get(item);
        if(nodeFriends != null) {
            for(var i = 0; i < nodeFriends.length; i++) {
                queue.push(nodeFriends[i]);
            }
        }
    }

    // 3. Couldn't find
    return "Couldn't find " + searchItem;
}

var personToFind = "Jake";
console.log(breadth_first_search(map, "Ben", personToFind));
personToFind = "Timothy";
console.log(breadth_first_search(map, "Ben", personToFind));