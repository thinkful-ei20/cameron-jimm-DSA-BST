'use strict';

class BST{
  constructor(key=null, value=null, parent=null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  // ---- INSERT ----------------------------------------
  // Check if the key exists, if it doesnt, create a new leaf
  // if the key is less than this.key, check if its left branch exists,
  // if it doesn't, create a new branch
  // if it does, insert recursively
  // else
  // if the key is less than this.key, check if its right branch exists,
  // if it doesn't, create a new branch
  // if it does, insert recursively
  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } 
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BST(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) { 
        this.right = new BST(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}


const display = (rootTree) => {
  setParentsNull(rootTree);
  console.log(JSON.stringify(rootTree, replacer, 2));
};

const setParentsNull = (tree) =>{
  if (!tree.left && !tree.right) {
    tree.parent = null;
    return;
  } else
  if(!tree.right){
    tree.parent = null;
    return setParentsNull(tree.left);
  } else
  if(!tree.left){
    tree.parent = null;
    return setParentsNull(tree.right);
  } else {
    tree.parent = null;
    setParentsNull(tree.right);
    setParentsNull(tree.left);
  }
};
const replacer = (name, val) => {
  if(val === null){
    return undefined;
  } else if(name === 'value'){
    return undefined;
  } else {
    return val;
  }
};

// Recursively check for the min height of the left branch.
function findMinHeight(bst) {
  // base case: if there is no left branch, return 1
  if (!bst.left) {
    return 1;
  }
  // else return 1 + recursive call
  return 1 + findMinHeight(bst.left);
}

// Recursively check for the max height of the right branch
function findMaxHeight(bst) {
  // base case: if there is no right branch, return 1
  if (!bst.right) {
    return 1;
  }
  // else return 1 + recursive call
  return 1 + findMaxHeight(bst.right);
}
 
// Find the height(number of levels) of a BST
function bstHeight(bst) {
  const right = findMaxHeight(bst); // recursive search for right branch
  const left = findMinHeight(bst);  // recursive search for left branch

  // if left is greater than right
  if (left > right) {
    // return left's height
    return console.log(`Left: ${left}`);
  } else {
    // else, return right's height
    return console.log(`Right: ${right}`);
  }
}

function main(){
  let bst = new BST();
  // bst.insert('B', '');
  // bst.insert('A', '');
  // bst.insert('D', '');
  // bst.insert('C', '');
  // bst.insert('E', '');
  // console.log(bst);
  // display(bst);

  
  bst.insert(3, '');
  bst.insert(1, '');
  bst.insert(4, '');
  bst.insert(6, '');
  bst.insert(9, '');
  bst.insert(2, '');
  bst.insert(5, '');
  bst.insert(7, '');
  // display(bst);
  bstHeight(bst);
}

main();