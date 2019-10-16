import React from 'react';
import config from '../../config';

export default class AddFamilyMemberForm extends React.Component {
  state = {
    relation_to_child: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_death: '',
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

  handleDobChange = (event) => {
    this.setState({
      date_of_birth: event.target.value,
    })
  }

  handleDodChange = (event) => {
    this.setState({
      date_of_death: event.target.value,
    })
  }

  handleDetailsChange = (event) => {
    this.setState({
      details: event.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    
    const person = this.state;
    const url = `${config.API_ENDPOINT}/persons/${this.props.match.params.id}/parents`;
    console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(person)
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        } 
        return res
      }
        
      )
  }
  
  handleClickCancel = () => {
    this.props.history.push('/home')
  };
  
  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="select-relative">Relation*</label>
          <select id="select-relative" onChange={this.handleRelationChange} defaultValue="Select relation">
            <option disabled>Select relation</option>
            <option>Father</option>
            <option>Mother</option>
          </select>
          <div>
            <label htmlFor="first-name">First name</label>
            <input type="text" name="firstName" id="first-name"
              onChange={this.handleNameChange} placeholder="First name"/>
            <label htmlFor="last-name">Last name</label>
            <input type="text" name="last-name" id="last-name" 
              onChange={this.handleLastNameChange} placeholder="Last name"/>
          </div>    
          <div >
            <label htmlFor="dob">Date of birth</label>
            <input name="dob" id="dob" placeholder="yyyy-mm-dd" 
            onChange={this.handleDobChange}/>
            <label htmlFor="dod">Date of death</label>
            <input name="dod" id="dod" placeholder="yyyy-mm-dd"
            onChange={this.handleDodChange}/>
          </div>
          <div >
            <label htmlFor="summary">Add interesting facts, details or story</label>
            <textarea name="summary" id="summary" rows="15"
            value={this.state.details}
            onChange={this.handleDetailsChange}></textarea>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={this.handleClickCancel}>Cancel</button>
        </form>
      </section>
    )
  }
}