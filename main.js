import { Tree } from "./Tree.js";


const tree = new Tree([7, 8, 11, 13, 16, 2, 19, 5, 6, 26, 3]);
console.log(tree.prettyPrint());
console.log(tree.isBalanced);
tree.deleteItem(6);
console.log(tree.isBalanced);
tree.deleteItem(7);
console.log(tree.prettyPrint());
console.log(tree.isBalanced);
console.log(tree.rebalance());
console.log(tree.prettyPrint());
console.log(tree.isBalanced);
tree.insert(99);
tree.insert(101);
console.log(tree.prettyPrint());
console.log(tree.isBalanced);