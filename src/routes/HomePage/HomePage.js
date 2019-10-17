import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import ApiContext from '../../ApiContext';


export default class HomePage extends React.Component {
  static contextType = ApiContext;
 
  handleDeletePerson = (id) => {
    fetch(`${config.API_ENDPOINT}/persons/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.deletePerson(id)
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    return (
      <section className = "person_card">
        <ul>
          {this.context.parents.map(person => 
            <li key={person.id}>
              <h3>{person.first_name + ' ' + person.last_name}</h3>
              <p>{person.date_of_birth}</p>
              <p>{person.details}</p>
              <Link to={`${person.id}/edit`}><button>Edit</button></Link>
              <button onClick={() => this.handleDeletePerson(person.id)}>Delete</button>
              <Link to={`${person.id}/add-parent`}><button>Add relatives</button></Link>
            </li>)}
        </ul>
      </section>
    )
  }
}