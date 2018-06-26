'use strict';

class BST {
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