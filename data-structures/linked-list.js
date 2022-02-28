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
}

var n = new Node(1);
n.appendToTail(2);
n.appendToTail(3);

while(n != null) {
    console.log(n.data);
    n = n.next;
}