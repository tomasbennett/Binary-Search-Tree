import { TreeNode } from "./TreeNode.js";
import { mergeSort } from "./MergeSort/merge-sort.js";

export class Tree {
    constructor(arr) {
        const noDuplicates = new Set(arr);
        const sorted = mergeSort([...noDuplicates]);
        this.root = this.buildTree(sorted);
    }

    buildTree(array) {

        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const node = new TreeNode(array[mid]);

        node.leftChild = this.buildTree(array.slice(0, mid));
        node.rightChild = this.buildTree(array.slice(mid + 1));

        return node;
        
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
      if (node === null) {
        return;
      }

      if (node.rightChild !== null) {
        this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }

      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
      
      if (node.leftChild !== null) {
        this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    }

    insert(value) {
      const newNode = new TreeNode(value);

      if (this.root === null) {
        this.root = newNode;
        return true;
      }
    
      let node = this.root;
      let parent = null;
    
      while (node !== null) {
        parent = node;
    
        if (value < node.value) {
          node = node.leftChild;

        } else if (value > node.value) {
          node = node.rightChild;

        } else {
          return false;

        }
      }
    
      if (value < parent.value) {
        parent.leftChild = newNode;

      } else {
        parent.rightChild = newNode;
        
      }
    
      return true;


    }

    deleteItem(value) {
      let node = this.root;
      let parent = null;

      while (node !== null && node.value !== value) {
        parent = node;
        if (value < node.value) {
          node = node.leftChild;
        } else {
          node = node.rightChild;
        }
      }
    
      if (node === null) return false;
    
      let replacement = null;
    
      if (node.leftChild === null) {
        replacement = node.rightChild;
      } else if (node.rightChild === null) {
        replacement = node.leftChild;
      } else {
        let successorParent = node;
        let successor = node.rightChild;
    
        while (successor.leftChild !== null) {
          successorParent = successor;
          successor = successor.leftChild;
        }

        node.value = successor.value;
    
        if (successorParent.leftChild === successor) {
          successorParent.leftChild = successor.rightChild;
        } else {
          successorParent.rightChild = successor.rightChild;
        }
    
        return true;
      }
    
      if (parent === null) {
        this.root = replacement;
      } else if (parent.leftChild === node) {
        parent.leftChild = replacement;
      } else {
        parent.rightChild = replacement;
      }
    
      return true;

    }

    find(value) {
      let node = this.root;

      while(node.value !== null) {
        if (value > node.value) {
          node = node.rightChild;

        } else if (value < node.value) {
          node = node.leftChild;

        } else {
          return node;

        }
      }

      return null;
    }

    levelOrderForEach(callback) {
      if (!callback) {
        throw new Error("Callback function must be provided");
      }

      if (this.root === null) return;

      const queue = [this.root];

      while (queue.length > 0) {
        const current = queue.shift();

        callback(current);

        if (current.leftChild !== null) {
          queue.push(current.leftChild);
        }

        if (current.rightChild !== null) {
          queue.push(current.rightChild);
        }


      }  



    }

    inOrderForEach(callback) {
      if (!callback) {
        throw new Error("Callback function must be provided");
      }

      const stack = [];
      let current = this.root;

      while (stack.length > 0 || current !== null) {
        
        while (current !== null) {
          stack.push(current);
          current = current.leftChild;
        }

        
        current = stack.pop();
        callback(current);

        
        current = current.rightChild;
      }




    }

    preOrderForEach(callback) {
      if (!callback) {
        throw new Error("Callback function must be provided");
      }

      if (this.root === null) return;

      function preOrderTraversal(callback, node) {
        if (node === null) return;
        
        callback(node);
        preOrderTraversal(callback, node.leftChild);
        preOrderTraversal(callback, node.rightChild);


      }

      preOrderTraversal(callback, this.root);
    }

    postOrderForEach(callback) {
      if (!callback) {
        throw new Error("Callback function must be provided");
      }

      if (this.root === null) return;

      function postOrderTraversal(callback, node) {
        if (node === null) return;

        postOrderTraversal(callback, node.leftChild);
        postOrderTraversal(callback, node.rightChild);
        callback(node);
      }

      postOrderTraversal(callback, this.root);
    }

    height(value) {
      const node = this.find(value);
      if (node === null) return null;
  
      function getHeight(currentNode) {
        if (currentNode === null) return -1;

        const leftHeight = getHeight(currentNode.leftChild);
        const rightHeight = getHeight(currentNode.rightChild);

        return Math.max(leftHeight, rightHeight) + 1;
      }
  
      return getHeight(node);
    }

    depth(value) {
      let node = this.root;
      let depth = 0;

      while(node.value !== null) {
        if (value > node.value) {
          node = node.rightChild;

        } else if (value < node.value) {
          node = node.leftChild;

        } else {
          return depth;

        }

        depth++;
      }

      return null;

    }

    get isBalanced() {
      if (this.root === null) return true;

      function checkBalance(node) {
        if (node === null) return 0;
    
        const leftHeight = checkBalance(node.leftChild);
        if (leftHeight === -1) return -1;
    
        const rightHeight = checkBalance(node.rightChild);
        if (rightHeight === -1) return -1;
    
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    
        return Math.max(leftHeight, rightHeight) + 1;
      }
    
      return checkBalance(this.root) !== -1;
    }

    rebalance() {
      const values = [];

      this.inOrderForEach((node) => values.push(node.value));

      this.root = this.buildTree(values);
    }


}