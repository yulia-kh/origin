export default function transformArrToView(personsMap, showModal, rootId){
  //build nested object with one root element
  function buildView(personId){
    const item = personsMap[personId];
    if(!item) {
        return {};
    }
      
    item.name = `${item.first_name}`;
    item.textProps = {x: 25, y: -40};
    item.gProps = {
      onClick: (event, node) => {showModal(item.id)}
    }
    if (Array.isArray(item.parents)){
        
      item.children = [];
      item.parents.forEach(parentId => {
          if (personsMap.hasOwnProperty(parentId)) {
              item.children.push(buildView(parentId));
          }
      });
    }
    return item; 
  }

  return buildView(rootId);
}