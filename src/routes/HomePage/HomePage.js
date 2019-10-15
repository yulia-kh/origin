import React from 'react';
import config from '../../config';

export default class HomePage extends React.Component {
  state = {
    parents: []
  }

  setParentsList = (res) => {
    this.setState({
      parents: res
    })
    console.log(this.state.parents);
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
          {parentsList.map(parent => 
            <li key={parent.id}>
              <h3>{parent.first_name + ' ' + parent.last_name}</h3>
              <p>{parent.date_of_birth}</p>
              <p>{parent.details}</p>
              <button>Edit</button>
              <button>Delete</button>
              <button>Add relatives</button>
            </li>)}
        </ul>
      </section>
    </>
  }
}