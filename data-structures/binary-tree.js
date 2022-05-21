class Node {
    name;
    childNodeArray;
    left;
    right;

    constructor(name, childNodeArray) {
        this.name = name;
        this.childNodeArray = childNodeArray;
        if(childNodeArray != null) {
            this.left = childNodeArray[0];
            this.right = childNodeArray[1];
        }
    }
}

class Tree {
    root;

    constructor(root) {
        this.root = root;
    }
}

/**
 * Tree Structure:
 *          8
 *       /      \
 *      4       10
 *   /     \ 
 *  2       5
 */
var tree = new Tree(new Node("8", 
                        [new Node("4", 
                            [new Node("2", null), new Node("5", null)]
                        ), 
                        new Node("10", null)]
                    ));

// console.log(tree);
console.log("inOrderTraversal - left, current, right:");
inOrderTraversal(tree.root);
console.log("preOrderTraversal - current, left, right:");
preOrderTraversal(tree.root);
console.log("postOrderTraversal - left, right, current:");
postOrderTraversal(tree.root);


function printNode(node) {
    console.log(node.name);
}

/**
 * DFS In Order: Print last lefts first (first print is AFTER going down all lefts)
 */
function inOrderTraversal(node) {
    if(node != null) {
        inOrderTraversal(node.left);    // Goes down until node.left is null, then visit will be called
        printNode(node);
        inOrderTraversal(node.right);
    }
}

/**
 * DFS Pre Order: Print each left node first
 */
function preOrderTraversal(node) {
    if(node != null) {
        printNode(node);    // prints node before continuing down left, and then down right
        preOrderTraversal(node.left);
        preOrderTraversal(node.right);
    }
}

/**
 * DFS Post Order: Print last left and then last right
 */
 function postOrderTraversal(node) {
    if(node != null) {
        postOrderTraversal(node.left);
        postOrderTraversal(node.right);
        printNode(node);
    }
}

