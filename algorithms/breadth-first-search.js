/**
 * Two uses:
 * 1. Find shortest distance between two things
 * 2. Find if something exists

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
map.set("Ben", ["Alice", "Bob"]);
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
function findPersonInNetwork(map, startPerson, searchFor) {
    // 1. Queue of nodes
    var queue = map.get(startPerson).slice(); //.slice copies array rather than giving the reference
                                        //If we get ref, we will modify the map when using queue.shift, etc

    var searched = new Set();

    // 2. For each (first) node in queue:
    while(queue.length > 0) {
        var person = queue.shift();
        
        // Ensure not already searched this person's nodes
        if(searched.has(person) == false) {
            searched.add(person);

            // 2.1 If first node is what we're looking for, done
            if(person == searchFor) return person + " is in the graph/network";
            
            // 2.2. Else add all of this node's neighbours to the queue
            var nodeFriends = map.get(person);
            if(nodeFriends != null) {
                for(var i = 0; i < nodeFriends.length; i++) {
                    queue.push(nodeFriends[i]);
                }
            }
        }
    }

    // 3. Couldn't find
    return "Couldn't find " + searchFor;
}

/**
 * Pattern/Essence: Add each layer of graph to a queue and iterate through. Don't search same nodes twice. Track length
 *                  of each layer and update layer count once gone through length for getting shortest path.
 */
function shortestPath(map, startPerson, shortestPathTo) {
    // 1. Queue of nodes
    var queue = map.get(startPerson).slice(); //.slice copies array rather than giving the reference
    //If we get ref, we will modify the map when using queue.shift, etc

    var searched = new Set();

    // How to track layers when we loop and perhaps count through 5 of same layer?
    // Track the initial length of layer. Once we have gone through 5 items, then increment
    // the layer we are on, and do the same again, tracking the length of the next layer
    var layerCount = 1;
    var layerLength = queue.length;
    var layerPos = 0;

    // 2. For each (first) node in queue:
    while(queue.length > 0) {
        var person = queue.shift();

        // Ensure not already searched this person's nodes
        if(searched.has(person) == false) {
            searched.add(person);

            // 2.1 If first node is what we're looking for, done
            if(person == shortestPathTo) return shortestPathTo + " is " + layerCount + " steps away";

            // 2.2. Else add all of this node's neighbours to the queue
            var nodeFriends = map.get(person);
            if(nodeFriends != null) {
                for(var i = 0; i < nodeFriends.length; i++) {
                    queue.push(nodeFriends[i]);
                }
            }

            // Increment count each time we go through a layer
            if(layerPos == layerLength) {
                layerCount++;
                layerPos = 0;
                layerLength = queue.length;
            }

            layerPos++;
        }
    }

    // 3. Couldn't find
    return "Couldn't find " + searchFor;
}

var personToFind = "Jake";
console.log(findPersonInNetwork(map, "Ben", personToFind));
personToFind = "Timothy";
console.log(findPersonInNetwork(map, "Ben", personToFind));

console.log(shortestPath(map, "Ben", "Alice"));    // Prints 1, as you go from Ben->Alice
console.log(shortestPath(map, "Ben", "Omega"));    // Prints 2, as you go from Ben->Alice->Omega
console.log(shortestPath(map, "Ben", "Timothy"));    // Prints 3, as you go from Ben->Alice->Omega->Timothy

