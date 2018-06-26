'use strict';

let root = {
  key: '2',
  left: null,
  right: null,
  parent: null,
};

let left1 = {
  key: '1',
  left: null,
  right: null, 
  parent: root,
};

let right1 = {
  key: '4',
  left: null,
  right: null, 
  parent: root,
};

let rightright = {
  key: '5',
  left: null,
  right: null, 
  parent: right1,
};

let rightleft = {
  key: '3',
  left: null,
  right: null, 
  parent: right1,
};

root.left = left1;
root.right = right1;
right1.right =rightright;
right1.left =rightleft;






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
  } if(name === 'value'){
    return undefined;
  } else {
    return val;
  }
};

display(root);

// Write an algorithm to find the height of a binary search tree. What is the run time of your algorithm?

function findMinHeight(bst) {
  if (!bst.left) {
    return 1;
  }
  return 1 + findMinHeight(bst.left);
}

function findMaxHeight(bst) {
  if (!bst.right) {
    return 1;
  }
  return 1 + findMaxHeight(bst.right);
}
 
function bstHeight(bst) {
  const right = findMaxHeight(bst);
  const left = findMinHeight(bst);

  if (left > right) {
    return console.log(`Left: ${left}`);
  } else {
    return console.log(`Right: ${right}`);
  }
}

console.log(bstHeight([3, 1, 4, 6, 9, 2, 5, 7]));