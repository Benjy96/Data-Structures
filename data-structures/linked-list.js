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

    getNodePreceding(node) {
        if(this.next == node) return this;
        else return this.next.getNodePreceding(node);
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
console.log("Added 7 to list. Now all nodes in list are:");
while(list != null) {
    console.log(list.data);
    list = list.next;
}