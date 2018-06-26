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
    // Check if the key is null, if it is, 
    // set this.key to key and this.value to value
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } 
    else if (key < this.key) {
      // if this.left doesnt exist
      // set this.left to a new BST
      if (this.left === null) {
        this.left = new BST(key, value, this);
      } else {
        // else, if it does exist
        // insert key, value on the left(recursive)
        this.left.insert(key, value);
      }
    }
    // Else 
    else {
      // check if this.right exists
      if (this.right === null) { 
        // if it doesn't, assign this.right to a new BST
        this.right = new BST(key, value, this);
      } else {
        // otherwise, insert key, value on the right(recursive)
        this.right.insert(key, value);
      }
    }
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
  display(bst);
}

main();