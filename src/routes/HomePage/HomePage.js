import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import ApiContext from '../../ApiContext';
import TokenService from '../../services/token-service';


export default class HomePage extends React.Component {
  static contextType = ApiContext;
  state = {
    parents: [],
    mainPerson: {}
  }

  handleUpdatePerson = (updatedPerson, id) => {
    id = parseInt(id);
    updatedPerson = {
      ...updatedPerson,
      id
    }
    if (updatedPerson.id === this.state.mainPerson.id) {
      this.setState({
        mainPerson: updatedPerson
      })
    }
    this.setState({parents: this.state.parents.map(person => 
      person.id === id ? updatedPerson : person)});

  }

  deletePerson = (personId) => {
    this.setState({
      parents: this.state.parents.filter(person => person.id !== personId)
    });
  }

  handleAddPerson = (person) => {
    this.setState({
      parents: [...this.state.parents, person]
    })
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/tree`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
      .then(res => this.setState({
        parents: res.parents,
        mainPerson: {
          id: res.id,
          first_name: res.first_name,
          last_name: res.last_name,
          date_of_birth: res.date_of_birth,
          date_of_death: res.date_of_death,
          details: res.details,
        }
      })
      )
      .catch(error => {
        console.error({error})
      })
  }
 
  handleDeletePerson = (id) => {
    fetch(`${config.API_ENDPOINT}/persons/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.deletePerson(id)
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    const value = {
      parents: this.state.parents,
      addPerson: this.handleAddPerson,
      updatePerson: this.handleUpdatePerson
    };
    return (
      <ApiContext.Provider value={value}>
        <section className = "person_card">
          <ul>
            {this.state.parents.map(person => 
              <li key={person.id}>
                <h3>{person.first_name + ' ' + person.last_name}</h3>
                <p>{person.date_of_birth}</p>
                <p>{person.details}</p>
                <Link to={`${person.id}/edit`}><button>Edit</button></Link>
                <button onClick={() => this.handleDeletePerson(person.id)}>Delete</button>
                <Link to={`${person.id}/add-parent`}><button>Add relatives</button></Link>
              </li>)}
              <li>
              <h3>{this.state.mainPerson.first_name + ' ' + this.state.mainPerson.last_name}</h3>
                <p>{this.state.mainPerson.date_of_birth}</p>
                <p>{this.state.mainPerson.details}</p>
                <Link to={`${this.state.mainPerson.id}/edit`}><button>Edit</button></Link>
                <button onClick={() => this.handleDeletePerson(this.state.mainPerson.id)}>Delete</button>
                <Link to={`${this.state.mainPerson.id}/add-parent`}><button>Add relatives</button></Link></li>
          </ul>
        </section>
      </ApiContext.Provider>
    )
  }
}