const Node = require("./treeNode.js");

class Tree {
  constructor(arr) {
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;
    const mid = parseInt(arr.length / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(value, root = this.root) {
    const node = new Node(value);
    if (root === null) return (root = node);
    if (root.value === value) return;
    if (value > root.value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    return root;
  }

  delete(value, root = this.root) {
    const node = new Node(value);
    if (root === null) return root;

    if (value > root.value) {
      root.right = delete (value.right, value);
    } else if (value < root.value) {
      root.left = this.delete(value, root.left);
    } else {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
      root.value = minValue(root.right);
      root.right = delete (root.right, root.value);
    }
    return root;
  }

  minValue(root) {
    let minv = root.value;
    while (root.left != null) {
      minv = root.left.value;
      root = root.left;
    }
    return minv;
  }

  inOrder(node = this.root) {
    if (this.root == null) return "Error - Tree is empty";

    const arr = [];
    if (node != null) {
      arr.push(...this.inOrder(node.left));
      arr.push(node.value);
      arr.push(...this.inOrder(node.right));
    }
    return arr;
  }

  preOrder(node = this.root) {
    if (this.root == null) return "Error - Tree is empty";

    const arr = [];
    if (node != null) {
      arr.push(node.value);
      arr.push(...this.preOrder(node.left));
      arr.push(...this.preOrder(node.right));
    }
    return arr;
  }

  postOrder(node = this.root) {
    if (this.root == null) return "Error - Tree is empty";

    const arr = [];
    if (node != null) {
      arr.push(...this.preOrder(node.left));
      arr.push(...this.preOrder(node.right));
      arr.push(node.value);
    }
    return arr;
  }

  height(){
    
  }
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(arr);
console.log("Preorder traversal of constructed BST:");

tree.insert(76);
tree.insert(123);
tree.delete(1);
console.log(tree);
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());

module.exports = Tree;
