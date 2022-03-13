/**
 * Method to find shortest distance between two things/if something exists.
 * Example problems for Finding the Shortest Path & Existence in network:
 * - Fewest edits from misspelling to real word
 * - Doctor closest to you in your network
 * - Fewest moves to victory in chess
 * - Is there a GPU seller your network?
 * ----------------
 * Implementation:
 * 1. Queue of nodes
 * 2. For each first node in queue not already checked:
    * 2.1. If node meets condition, done
    * 2.2. Else add all node's neighbours to queue
 * 3. If empty, no nodes in network meeting condition
 * ----------------
 * Time Complexity:
 * O(V + E)
 * Where:
 * E = number of Edges (i.e., connections from one person to another) (because you must follow each link)
 * V = number of Vertices (i.e., people in graph) (because adding person to queue takes O(1) per person)
 */

var map = new Map();
map.set("Ben", ["Bob", "Alice"]);
map.set("Alice", ["Jane", "Omega"]);
map.set("Omega", ["Rachel", "Timothy"]);
map.set("Timothy", ["Ben", "Alice"]);


/**
 * Searches for a node in a graph, a layer at a time.
 * Nodes directly connected to the start node are the first layer.
 * Nodes connected to a node which are directly connected to the start node are the second layer, and so on.
 * 
 * Pattern/Essence: Add each layer of graph to a queue and iterate through. Don't search same node's nodes twice.
 */
function breadth_first_search(map, start, searchItem) {
    // 1. Queue of nodes
    var queue = map.get(start).slice(); //.slice copies array rather than giving the reference
                                        //If we get ref, we will modify the map when using queue.shift, etc

    var searched = new Set();

    // 2. For each (first) node in queue:
    while(queue.length > 0) {
        var item = queue.shift();
        
        // Ensure not already searched this person's nodes
        if(searched.has(item) == false) {
            searched.add(item);

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
    }

    // 3. Couldn't find
    return "Couldn't find " + searchItem;
}

var personToFind = "Jake";
console.log(breadth_first_search(map, "Ben", personToFind));
personToFind = "Timothy";
console.log(breadth_first_search(map, "Ben", personToFind));