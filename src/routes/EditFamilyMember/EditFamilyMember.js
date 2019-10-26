import React from 'react';
import config from '../../config';
import ApiContext from '../../ApiContext';
import TokenService from '../../services/token-service';

export default class EditFamilyMember extends React.Component {
  state = {
    relation_to_child: '',
    first_name: '',
    last_name: '',
    details: ''
  };

  static contextType = ApiContext;

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/persons/${id}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(responseData => {
        this.setState({
          relation_to_child: responseData.relation_to_child,
          first_name: responseData.first_name,
          last_name: responseData.last_name,
          details: responseData.details
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

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
    const { id } = this.props.match.params;
    const personToUpdate = {
      relation_to_child: this.state.relation_to_child,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      details: this.state.details
    };
   
    const url = `${config.API_ENDPOINT}/persons/${id}`;

    fetch(url, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(personToUpdate)
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e));
        } 
      })
      .then(() => {
        this.resetFields(personToUpdate);
        this.context.updatePerson(personToUpdate, id);
        this.props.history.push('/home');
      })
      .catch(e => {
        console.error({e})
      })
  }

  resetFields = (newFields) => {
    this.setState({
      relation_to_child: newFields.relation_to_child || '',
      first_name: newFields.first_name || '',
      last_name: newFields.last_name || '',
      details: newFields.details || ''
    })
  }
  
  handleClickCancel = () => {
    this.props.history.push('/home')
  };

  render() {
    const { relation_to_child, first_name, last_name, details} = this.state;
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="select-relative">Relation*</label>
          <select id="select-relative" onChange={this.handleRelationChange} value={relation_to_child} required>
            <option disabled>Select relation</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
          </select>
            <label htmlFor="first-name">First name</label>
            <input type="text" name="firstName" id="first-name" value={first_name}
              onChange={this.handleNameChange} placeholder="First name"/>
            <label htmlFor="last-name">Last name</label>
            <input type="text" name="last-name" id="last-name" value={last_name}
              onChange={this.handleLastNameChange} placeholder="Last name"/>
            <label htmlFor="summary">Add interesting facts, details or story</label>
            <textarea name="summary" id="summary" rows="15"
            value={details}
            onChange={this.handleDetailsChange}></textarea>
          <button type="submit">Submit</button>
          <button className="cancel" type="button" onClick={this.handleClickCancel}>Cancel</button>
        </form>
      </section>
    )
  }
}