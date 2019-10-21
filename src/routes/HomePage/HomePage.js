import React from 'react';
import { Link } from 'react-router-dom';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import config from '../../config';
import ApiContext from '../../ApiContext';
import TokenService from '../../services/token-service';

function transformArrToView(arr){
  let root = {};
  const parents = {};
  for(let i=0; i<arr.length; i++){
      const current = arr[i];
      if(current.parent_id === null){
          root = current;
      } else {
          if(!parents.hasOwnProperty(current.child_id)){
              parents[current.child_id] = [];
          }
          parents[current.child_id].push(current);
      }
  }

  function buildView(item){
      const itemParents = parents[item.id];
      item.name = `${item.first_name} ${item.last_name}`;
      if (Array.isArray(itemParents)){
          item.children = itemParents.map(parent => buildView(parent));
      }
      return item; 
  }
  return buildView(root);
}

export default class HomePage extends React.Component {
  static contextType = ApiContext;
  state = {
    family: []
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
      .then(res => {
        console.log(res);
        this.setState({
          family: res
        });
      })
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
        <Tree
          data={transformArrToView(this.state.family)}
          height={400}
          width={400}
          animated/>
          <ul>
            {this.state.family.map(person => 
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
      </ApiContext.Provider>
    )
  }
}