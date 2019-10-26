import React from 'react';
import config from '../../config';
import ApiContext from '../../ApiContext';
import TokenService from '../../services/token-service';

export default class AddFamilyMemberForm extends React.Component {
  state = {
    relation_to_child: '',
    first_name: '',
    last_name: '',
    details: ''
  };

  handleRelationChange = (event) => {
    this.setState({
      relation_to_child: event.target.value,
    })
  }

  handleNameChange = (event) => {
    this.setState({
      first_name: event.target.value,
    })
  }

  handleLastNameChange = (event) => {
    this.setState({
      last_name: event.target.value,
    })
  }

  handleDetailsChange = (event) => {
    this.setState({
      details: event.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    
    let person = this.state;
    const child_id = this.props.match.params.id
    const url = `${config.API_ENDPOINT}/persons/${child_id}/parents`;
    person = {...person, child_id}

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(person)
    })
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
      .then(
        () => {
          this.props.history.push('/home');
        }
      )
      .catch(e => {
        console.error({e})
      })

  }
  
  handleClickCancel = () => {
    this.props.history.push('/home')
  };
  
  render() {
    return (<ApiContext.Consumer>
      {({addPerson}) => (
        <section>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="select-relative">Relation*</label>
          <select id="select-relative" onChange={this.handleRelationChange} defaultValue="Select relation" required>
            <option disabled>Select relation</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
          </select>
          <label htmlFor="first-name">First name</label>
          <input type="text" name="firstName" id="first-name"
            onChange={this.handleNameChange} placeholder="First name"/>
          <label htmlFor="last-name">Last name</label>
          <input type="text" name="last-name" id="last-name" 
            onChange={this.handleLastNameChange} placeholder="Last name"/>
          <label htmlFor="summary">Add interesting facts</label>
          <textarea name="summary" id="summary" rows="15"
          value={this.state.details}
          onChange={this.handleDetailsChange}></textarea>
          <button type="submit" onSubmit={() => addPerson}>Submit</button>
          <button className="cancel" type="button" onClick={this.handleClickCancel}>Cancel</button>
        </form>
      </section>
      )}
    </ApiContext.Consumer>
      
    )}
}