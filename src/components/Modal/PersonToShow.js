import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';

class PersonToShow extends React.Component {
  render() {
    return (
      <ApiContext.Consumer>
        {({family, showModal, deletePerson, itemId, rootId}) => (
          itemId === rootId ?
          <section>
            <div className='button-container'>
              <Link to={`${itemId}/edit`}><button className="edit">Edit</button></Link>
              <Link to={`${itemId}/add-parent`}><button className='add'>Add parents</button></Link>
            </div>
            <h3 className="modal-title">{family[itemId].first_name + ' ' + family[itemId].last_name}</h3>
            <p className="date">{family[itemId].date_of_birth === null ? '' : 'Birth: ' + family[itemId].date_of_birth}
            {family[itemId].date_of_death === null ? '' : ' - Death: ' + family[itemId].date_of_death}</p>
            <p className="scroll-content">{family[itemId].details}</p>
          </section> 
          :
          <section>
            <div className='button-container'>
              <Link to={`${itemId}/edit`}><button className="edit">Edit</button></Link>
              <button onClick={() => {deletePerson(itemId); showModal()}} className="delete">Delete</button>
              <Link to={`${itemId}/add-parent`}><button className='add'>Add parents</button></Link>
            </div>
            <h3 className="modal-title">{family[itemId].first_name + ' ' + family[itemId].last_name}</h3>
            <p className="date">{family[itemId].date_of_birth === null ? '' : 'Birth: ' + family[itemId].date_of_birth}
            {family[itemId].date_of_death === null ? '' : ' - Death: ' + family[itemId].date_of_death}</p>
            <p className="scroll-content">{family[itemId].details}</p>  
          </section>
        )}
      </ApiContext.Consumer>
    )
  } 
}

export default PersonToShow;