import React from 'react';

const ApiContext = React.createContext({
  parents: [],
  addPerson: () => {},
  deletePerson: () => {},
  updatePerson: () => {}
})

export default ApiContext;