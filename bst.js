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

  findMax() {
    if (!this.right) {
      return this;
    }
    return this.right.findMax();
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

function isBST(bst){
  console.log(`key: ${bst.key}, left:${bst.left ? bst.left.key : null}, right:${bst.right? bst.right.key : null}`);
  // Checks if current node has left and right banches
  if(bst.right && bst.left){
    // If both left and right branches exist check if the root of both branches are valid
    if(bst.key >= bst.right.key || bst.key <= bst.left.key){
      // If unvalid return false
      return false;
    } else {
      // If both branches are valid check each of them recursively
      // The && ensures that if any one down the line returns false everything is set to false
      return (isBST(bst.right) && isBST(bst.left));
    }
    // Else, if only one branch exists check if the branch is valid
  } else if(bst.right){
    // If invalid returns false
    if(bst.key >= bst.right.key){
      return false;
    }
    // If valid check if it's branch is valid
    else {
      return isBST(bst.right);
    } 
  } else if(bst.left){
    if(bst.key <= bst.left.key){
      return false;
    } else {
      return isBST(bst.left);
    }
    // If no branches exist return true
    // If all other branches are valid this gets passed all the way back up
  } else {
    return true;
  }
}

//if right most node has no branches, then third is the sibling, if no sibling third is grandparent
//if right most node has a left branch but no right then third is the parent of rightmost

function thirdHighest(bst){
  //Special case: empty tree.
  if (bst.key === null) 
    return null;
  var state = {n: 3, result: null};
  nth_largest(bst, state);
  return state.result;


  function nth_largest(tree, state) { 
    //Finding the largest node means traversing the right first.
    if (tree.right) {
      nth_largest(tree.right, state);
      if (state.result) return;
    }
    if (!--state.n) { 
      //Found it.
      state.result = tree.key; 
      return;
    }
    if (tree.left) nth_largest(tree.left, state);
  }
}

function isTreeBalanced (tree) {
  if (!tree.right) {
    return !(tree.left && (tree.left.left || tree.left.right));
  }
  if (!tree.left) {
    return !(tree.right && (tree.right.left || tree.right.right));
  }
  return isTreeBalanced(tree.left) && isTreeBalanced(tree.right);
}

function main(){
  let bst = new BST();
  
  // Testing display function
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
  
  // 1) Check Height
  // bstHeight(bst);

  // 2) is it BST?
  let root = {
    key: 2,
    left: null,
    right: null,
    parent: null,
  };
  let left1 = {
    key: 1,
    left: null,
    right: null, 
    parent: root,
  };
  let right1 = {
    key: 4,
    left: null,
    right: null, 
    parent: root,
  };
  let rightright = {
    key: 5,
    left: null,
    right: null, 
    parent: right1,
  };
  let rightleft = {
    key: 3,
    left: null,
    right: null, 
    parent: right1,
  };
  root.left = left1;
  root.right = right1;
  right1.right =rightright;
  right1.left = rightleft;
  console.log(isBST(root));
  display(root);

  
  // 3)Third Largest

  // display(bst);
  //console.log(thirdHighest(bst));
}

main();