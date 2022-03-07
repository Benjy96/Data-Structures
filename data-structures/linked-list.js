/**
 * Doubly-Linked List vs array
 * 
 * Bad: 
 * Extra space for storing pointers
 * Inefficient random access to items
 * Arrays better memory locality and cache performance than random pointer jumping
 * 
 * Good: 
 * Insertion/deletion is simpler
 * No overflow unless memory actually full
 * Moving pointers faster than moving items
 * 
 * 
 * Arrays prob better for access, linked list faster for randomly adding things to some position.
 */

/**
 * Singly linked list.
 */
class Node {
    next;   // stores next node in the linked list
    data;   // stores current node's value

    constructor(data, next) {
        this.data = data;
        this.next = next;
    }

    appendToTail(data) {
        // create a node with data
        var end = new Node(data);
        var node = this;

        // Move to the last node
        while(node.next != null) {
            node = node.next;
        }

        // set last node's next node to the newly created end node
        node.next = end;
    }

    searchListFor(data) {
        if(this.data == data) return this;  // 1 != 2, go to next line
        else if(this.next != null) return this.next.searchListFor(data);    //next is { data: 2, ...}, will return above if in next
    }

    insertIntoList(data) {
        // we are acting on n, head of list, and it needs to become the 2nd node in the list instead of head
        // create copy of head
        var secondNode = new Node(this.data, this.next);

        // set the current head to the new data, and then set the next to the copy of head
        this.data = data;
        this.next = secondNode;
    }

    // Assumes we begin search from head of list
    getNodePreceding(node) {
        if(this.next == node) return this;
        else if(this.next != null) return this.next.getNodePreceding(node);
    }

    /**
     * Deletes nodes. Sets node before the node to be deleted to point to the node after the node that is deleted.
     */
    deleteNode(node) {
        if(node == this) return;    // Do not delete head of list

        var nodeBeforeNode = this.getNodePreceding(node);
        var nodeAfterNode = node.next;

        // set node before to point to node after - now no references to "this", so should be garbage collected
        if(nodeAfterNode != null) nodeBeforeNode.next = nodeAfterNode;
        else nodeBeforeNode.next = null;
    }

    printList() {
        var current = this;
        while(current != null) {
            console.log(current.data);
            current = current.next;
        }
    }
}

var list = new Node(1);
list.appendToTail(2);
list.appendToTail(3);

var node3 = list.searchListFor(3);
var nodePreceding3 = list.getNodePreceding(node3);
console.log("Added 2 and 3 to list after 1. Node preceding 3 is: " + nodePreceding3.data);

console.log("---");
console.log("First node's data " + list.data + ". The rest are:");
var x = list.searchListFor(2);
console.log(x.data);
console.log(x.next.data);

list.insertIntoList(7);

console.log("---");
console.log("Added 7 to list at head. Now all nodes in list are:");
list.printList();

console.log("---");
console.log("Delete the node with 2. Nodes are now:");
var nodeWith2 = list.searchListFor(2);
list.deleteNode(nodeWith2);
list.printList();

console.log("---");
list.appendToTail(3);
list.printList();
deleteDuplicateDataNodes(list);
console.log("Deleted Duplicates. List is now:");
list.printList();

console.log("--- Interview Question 2: Algo to return Kth to last node");
list.appendToTail(4);
list.appendToTail(5);
list.appendToTail(6);
list.appendToTail(7);
list.appendToTail(8); 
list.appendToTail(9);   // last element will be 9
list.printList();
var numNodesBeforeLast = 3;
console.log("The node " + numNodesBeforeLast + " nodes before last is " + returnKthToLast(list, numNodesBeforeLast));

/**
 * 
 * @param {*} node Start point to delete duplicates from
 */
function deleteDuplicateDataNodes(node) {
    /**
     * What are the most basic steps?
     * 
     * Loop through array
     * Store duplicates
     * Delete duplicates
     *      Remove reference to them
     *          Need to take preceding node and clear its next reference
     * 
     * [prev]-->[node]-->[next]
     * [prev]-->      -->[next]
     * 
     */

    var duplicates = new Set();
    var prev = new Node();

    // 1. Loop through list
    while(node != null) {
        if(duplicates.has(node.data) == false) {
            // 2. Store data to find duplicates
            duplicates.add(node.data);
            // Store previous node so we can fall back to it if we find a duplicate in next loop
            prev = node;
        } else {
            // 3. If we have seen this data before, remove reference to this node - currently prev.next == node
            prev.next = node.next;
        }
        node = node.next;
    }
}

/**
 * Problem: Implement an algorithm to find the kth to last element of a singly linked list
 * Input: Head of a singly-linked list and the position before last you want to find. k==0 means the last node.
 * Output: The kth node before the last
 * 
 * How to solve?
 * 1. Store each previous node with an index? In an array? Would be O(n) space & time?
 * 
 * Space Complexity: O(n) - as we store an array of elements the same length as the list
 * Time Complexity: O(n) - as we iterate through the list until the end
 */
function returnKthToLast(node, k) {
    var count = 0;
    var nodeArray = [];
    // create a backwards copy of prior list
    while(node.next != null) {
        nodeArray[count] = node.data;
        node = node.next;
        count++;
    }
    // assign outside loop, as the last node will have node.next == null and loop will exit
    nodeArray[count] = node.data;   

    // adjust with -1 as if an array was length 1, first index to access would be 0
    return nodeArray[(nodeArray.length-1) - k];
}