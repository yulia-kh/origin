import React from 'react';

const ApiContext = React.createContext({
  parents: [],
  addPerson: () => {},
  deletePerson: () => {}
})

export default ApiContext;