import React from 'react';
import ReactDOM from 'react-dom';
import AddFamilyMemberForm from './AddFamilyMemberForm';

describe('AddFamilyMemberForm component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AddFamilyMemberForm />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
});