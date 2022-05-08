/**
 * Finds fastest path based on a graph with WEIGHTS; Find path with smallest total cost. (BFS finds shortest path with fewest connections/segments.)
 * 
 * 1. Find cheapest node.
 * 2. Update total cost to get to neighbours (cost to current + to neighbour)
 * 3. Repeat until done for every node.
 * 4. Follow parents back to origin for final path.
 * 
 * BFS finds shortest distance.
 * DKA finds lowest cost.
 * 
 * You need a few things:
 * - Graph containing routes. (graph)
 * - Place to store the latest, cheapest costs of a path. (costs)
 * - The route. (parents)
 * 
 */

// INCORRECT DATA STRUCTURE
var map = new Map();

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

var cheapestNode = getLowestCostNode3(costs);
while(cheapestNode != null) {
    var cost = costs[cheapestNode];
    var neighbours = graph[cheapestNode];

    for(var n in neighbours) {
        var newCost = cost + neighbours[n];

        if(costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = cheapestNode;
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

