/**
 * Finds fastest path based on a graph with WEIGHTS; Find path with smallest total cost. (BFS finds shortest path with fewest connections/segments. DKA finds lowest cost.)
 * 
 * Process: go along cheapest route until a cheaper route.
 * 
 * 1. Get cheapest node not already processed
 * 2. Get cheapest node's neighbours
 * 3. For each of cheapest node's neighbours, update cost of / parent to get there if current path + cost is cheaper 
 *    than existing cost
 * 4. Store the current, cheapest node in the processed list
 * 5. Repeat until last node
 * 6. Follow parents back to origin for fastest route 
 * 
 * You need a few things:
 * - Graph containing routes. (graph)
 * - Place to store the latest, cheapest costs of a path. (costs)
 * - The route. (parents)
 * - Processed nodes. (processed)
 * 
 * ** APESPLANATION: WE GO SO FAR ALONG ONE ROUTE AND STOP GOING THAT WAY ONCE THE COST BECOMES GREATER THAN SOME OTHER CLOSER NODE. **
 * 
 * CAVEAT: Dijkstra doesn't work with NEGATIVE nodes. Why? Doesn't expect them - if you have 3 nodes, A, B, C, and initial path is 1 cheap 1 expensive,
 * you will take initial path and never get the next. Except if u went to B, perhaps it would then have a negative score to C, but u would never find out.
 * 
 */

// INCORRECT DATA STRUCTURE - was initial idea
var map = new Map();
// This DS does not work as you cannot access the costs at any time - c could be in
// multiple places. E.g., in a and b, in any index of those arrays.
// Whereas a centralised hash map, you can access and update c at any time.
map.set("a", [{ name: "b", cost: 1, parent: "a" }, { name: "c", cost: 5, parent: "a" }]);
map.set("b", [{ name: "d", cost: 4, parent: "b" }, { name: "c", cost: 1, parent: "b" }]);
map.set("c", [{ name: "d", cost: 10000, parent: "c" }]);
map.set("d", { cost: Infinity, parent: null });

/*

START -> a
START -> b

a -> b
a -> c

b -> c
b -> d

c -> d

*/

var graph = {};
graph["start"] = {};
graph["start"]["a"] = 1;
graph["start"]["b"] = 1;

graph["a"] = {};
graph["a"]["b"] = 1;
graph["a"]["c"] = 5;

graph["b"] = {};
graph["b"]["c"] = 1;
graph["b"]["d"] = 5;

graph["c"] = {};
graph["c"]["d"] = 10,000;

graph["d"] = {};

// Cost is how long to get there from start. Infinity if unknown
var costs = {};
costs["a"] = 1;
costs["b"] = 1;
costs["c"] = Infinity;
costs["d"] = Infinity;

// Parents will store the cheapest prior node to this node
var parents = {};
parents["a"] = "start";
parents["b"] = "start";
parents["c"] = null;
parents["d"] = null;

processed = new Set();

/**
 * 
 * 1. Get cheapest node
 * 2. Get cheapest node's neighbours
 * 3. For each of cheapest node's neighbours, update [cost of] & [parent to get there] if current path + cost is cheaper 
 *    than existing cost
 * 4. Repeat until last node
 * 5. Follow parents back to origin for fastest route 
 * 
 * 
 * What don't I understand?
 * - Why do we not check a node twice? What if we come to it through a cheaper route?
 *      We still calculate cost TO the node if it is a neighbour more than once, we just don't calculate it as the lowest cost node twice.
 * 
 *      
 *      
 *      - What are we doing when we "process" a node?
 *          Getting its neighbours. Updating costs TO those neighbour nodes FROM current (cheapest) node.
 * 
 * 
 * - Are we checking EVERY path?
 * - Can there be a shorter path through an already visited node that we can't visit again because it has already been searched?
 */

var cheapestNode = getLowestCostNode3(costs);
while(cheapestNode != null) {
    var cheapestNodeCost = costs[cheapestNode];
    var cheapestNodesNeighbours = graph[cheapestNode];

    for(var neighbour in cheapestNodesNeighbours) {
        var newCost = cheapestNodeCost + cheapestNodesNeighbours[neighbour];

        if(costs[neighbour] > newCost) {
            costs[neighbour] = newCost;
            parents[neighbour] = cheapestNode;
        }
    }
    processed.add(cheapestNode);
    cheapestNode = getLowestCostNode3(costs);
}

function getLowestCostNode3(costs) {
    var lowestCost = Infinity;
    var lowestCostNode = null;

    for(var node in costs) {
        var nodeCost = costs[node];
        if(nodeCost < lowestCost && processed.has(node) == false) {
            lowestCost = nodeCost;
            lowestCostNode = node;
        }
    }
    return lowestCostNode;
}

// PRINT THE RESULT
var backwardsRoute = ["d"];
var nextNode = parents["d"];

while(nextNode != null) {
    backwardsRoute.push(nextNode);
    nextNode = parents[nextNode];
}

console.log(backwardsRoute.reverse());

