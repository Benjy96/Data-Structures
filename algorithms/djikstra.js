/**
 * Finds fastest path based on a graph with WEIGHTS; Find shortest path with smallest total weight/cost. (BFS finds shortest path with fewest connections/segments.)
 * 
 * 1. Find cheapest node.
 * 2. Update total cost to get to neighbours (cost to current + to neighbour)
 * 3. Repeat until done for every node.
 * 4. Follow parents back to origin for final path.
 * 
 */

var map = new Map();

/*

       /a\
    b  ->   c
       \d/       

*/
map.set("a", [{ name: "b", cost: 1, parent: "a" }, { name: "c", cost: 5, parent: "a" }]);
map.set("b", [{ name: "d", cost: 4, parent: "b" }, { name: "c", cost: 1, parent: "b" }]);
map.set("c", [{ name: "d", cost: 1, parent: "c" }]);

console.log(map);


function getLowestCostNode(map, node) {
    var queue = map.get(node).slice();

    var lowestCost = Infinity;
    var lowestCostNode = null;

    while(queue.length > 0) {
        var nextNode = queue.shift();

        if(nextNode.cost < lowestCost) {
            lowestCost = nextNode.cost;
            lowestCostNode = nextNode;
        }
    }
    return lowestCostNode;
}

function getLowestCostPath(map, startNode) {

}

console.log(getLowestCostNode(map, "a"));