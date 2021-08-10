const formatMenu=(menu,idKey='path',childKey='children')=>{
  return menu.filter(v=>{
    if(v.hidden||v[idKey].indexOf('/:')>-1){
      return false;
    }
    if(Array.isArray(v[childKey])){
      v[childKey]=formatMenu(v[childKey],idKey,childKey);
    }
    return true;
  });
};

export default formatMenu;


