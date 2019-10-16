import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

export default class HomePage extends React.Component {
  state = {
    parents: []
  }
  deletePerson = (e) => {
    console.log(e.target.value);
  }

  setParentsList = (res) => {
    this.setState({
      parents: res
    })
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/persons/1/tree`)
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
      .then(res => this.setParentsList(res));
  }
  render() {
    const parentsList = this.state.parents;
    return <>
      <section className = "person_card">
        <ul>
          {parentsList.map(person => 
            <li key={person.id}>
              <h3>{person.first_name + ' ' + person.last_name}</h3>
              <p>{person.date_of_birth}</p>
              <p>{person.details}</p>
              <Link to={'/'}><button>Edit</button></Link>
              <button onClick={this.deletePerson}>Delete</button>
              <Link to={`${person.id}/add-parent`}><button>Add relatives</button></Link>
            </li>)}
        </ul>
      </section>
    </>
  }
}