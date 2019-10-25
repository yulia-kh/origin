import React from 'react';

const ApiContext = React.createContext({
  family: {},
  addPerson: () => {},
  updatePerson: () => {},
  deletePerson: () => {}
})

export default ApiContext;