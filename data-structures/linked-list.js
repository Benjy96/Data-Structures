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

    constructor(data) {
        this.data = data;
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
}

var n = new Node(1);
n.appendToTail(2);
n.appendToTail(3);

console.log("First node's data " + n.data);
var x = n.searchListFor(2);
console.log(x.data);
console.log(x.next.data);

console.log("---");
while(n != null) {
    console.log(n.data);
    n = n.next;
}