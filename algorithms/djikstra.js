/**
 * Finds fastest path based on a graph with WEIGHTS; Find shortest path with smallest total weight/cost. (BFS finds shortest path with fewest connections/segments.)
 * 
 * 1. Find cheapest node.
 * 2. Update cost of cheapest node's neighbours.
 * 3. Repeat until done for every node.
 * 4. Calculate final path.
 * 
 * Basically, look at every route and update if a shorter path to get to end.
 */

var map = new Map();
var searched = new Set();

map.set("a", [{ name: "b", cost: 5 }, { name: "c", cost: 2 }]);
map.set("b", [{ name: "d", cost: 3 }]);
map.set("c", [{ name: "d", cost: 3 }]);


function getLowestCostNode(map, node) {
    var queue = map.get(node).slice();

    var lowestCost = Infinity;
    var lowestCostNode = null;

    while(queue.length > 0) {
        var nextNode = queue.shift();
        
        if(searched.has(nextNode.name) == false) {
            searched.add(nextNode.name);

            if(nextNode.cost < lowestCost) {
                lowestCost = nextNode.cost;
                lowestCostNode = nextNode;
            }
        }
    }
    return lowestCostNode;
}

console.log(getLowestCostNode(map, "a"));