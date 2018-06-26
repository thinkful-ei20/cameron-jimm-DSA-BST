let root = {
  key: 'B',
  left: null,
  right: null,
  parent: null,
};

let left1 = {
  key: 'A',
  left: null,
  right: null, 
  parent: root,
};

let right1 = {
  key: 'D',
  left: null,
  right: null, 
  parent: root,
};

let rightright = {
  key: 'E',
  left: null,
  right: null, 
  parent: right1,
};

let rightleft = {
  key: 'C',
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