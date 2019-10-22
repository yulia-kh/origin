export default function transformArrToView(arr, showModal){
  let root = {};
  const parentsLookup = {};
  for(let i=0; i<arr.length; i++){
      const current = arr[i];
      if(current.parent_id === null){
          root = current;
      } else {
          if(!parentsLookup.hasOwnProperty(current.child_id)){
              parentsLookup[current.child_id] = [];
          }
          parentsLookup[current.child_id].push(current);
      }
  }
  console.log(root);

  function buildView(item){
      const itemParents = parentsLookup[item.id];
      item.name = `${item.first_name} ${item.last_name}`;
      item.gProps = {
        onClick: (event, node) => {showModal(item.id)}
      }
      if (Array.isArray(itemParents)){
          item.children = itemParents.map(parent => buildView(parent));
      }
      return item; 
  }
  return buildView(root);
}