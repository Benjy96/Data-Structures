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
 *      4       10
 *  2
 */
var tree = new Tree(new Node("8", 
                        [new Node("4", 
                            [new Node("2", null)]
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
 * Visit left, current, right - will print AFTER reaching end of LEFT branch
 */
function inOrderTraversal(node) {
    if(node != null) {
        inOrderTraversal(node.left);    // Goes down until node.left is null, then visit will be called
        printNode(node);
        inOrderTraversal(node.right);
    }
}

/**
 * Visit current node BEFORE child nodes - will print BEFORE reaching end of branch
 */
function preOrderTraversal(node) {
    if(node != null) {
        printNode(node);
        preOrderTraversal(node.left);
        preOrderTraversal(node.right);
    }
}

/**
 * Visit current node AFTER child nodes - will print AFTER reaching end of branch
 */
 function postOrderTraversal(node) {
    if(node != null) {
        postOrderTraversal(node.left);
        postOrderTraversal(node.right);
        printNode(node);
    }
}

