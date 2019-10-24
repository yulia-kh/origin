import React from 'react';
import { Link } from 'react-router-dom';
import Tree from 'react-tree-graph';
// import 'react-tree-graph/dist/style.css';
import Modal from '../../components/Modal/Modal';
import config from '../../config';
import ApiContext from '../../ApiContext';
import TokenService from '../../services/token-service';
import './HomePage.css';
import transformArrToView from '../../components/Utils/helpers';

export default class HomePage extends React.Component {
  static contextType = ApiContext;
  state = {
    show: false,
    itemId: '',
    family: {},
    rootId: ''
  }

  showModal = id => {
    this.setState({
      show: !this.state.show,
      itemId: id
    });
  }

  handleUpdatePerson = (updatedPerson, id) => {
    const updatedFamily = this.state.family;
    updatedFamily[id] = updatedPerson;
    this.setState({
      family: updatedFamily
    });
  }

  handleAddPerson = (person) => {
    console.log('hi from handle add')
    console.log(person);
    const updatedFamily = this.state.family;
    updatedFamily[person.id] = person;
    this.setState({
      family:updatedFamily
    });
    console.log(this.state.family);
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
        family: res.family,
        rootId: res.rootId
      });
    })
    .catch(error => {
      console.error({error})
    });
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
        const keys = Object.keys(this.state.family).filter(key => parseInt(key) !== parseInt(id));
        const updatedFamily = {};
        keys.forEach(key => {
          updatedFamily[key] = this.state.family[key];
        })

        this.setState({
          family: updatedFamily
        });
      })
      // .then(() => this.showModal)
      .catch(error => {
        console.error({error})
      })
  }

  handleShowPerson = (id) => {
    if(!id) return;
    let personToShow = this.state.family[id];
    personToShow = {
      first_name: '',
      last_name: '',
      id: '',
      ...personToShow
    }
    return (
      personToShow.id === this.state.rootId ?
        <section>
          <div className='button-container'>
            <Link to={`${personToShow.id}/edit`}><button className="edit">Edit</button></Link>
            <Link to={`${personToShow.id}/add-parent`}><button className='add'>Add parents</button></Link>
          </div>
          <h3 className="modal-title">{personToShow.first_name + ' ' + personToShow.last_name}</h3>
          <p className="date">{personToShow.date_of_birth === null ? '' : 'Birth: ' + personToShow.date_of_birth}
          {personToShow.date_of_death === null ? '' : ' - Death: ' + personToShow.date_of_death}</p>
          <p className="scroll-content">{personToShow.details}</p>
        </section> 
        :
        <section>
          <div className='button-container'>
            <Link to={`${personToShow.id}/edit`}><button className="edit">Edit</button></Link>
            <button onClick={() => {this.handleDeletePerson(personToShow.id);this.showModal()}} className="delete">Delete</button>
            <Link to={`${personToShow.id}/add-parent`}><button className='add'>Add parents</button></Link>
          </div>
          <h3 className="modal-title">{personToShow.first_name + ' ' + personToShow.last_name}</h3>
          <p className="date">{personToShow.date_of_birth === null ? '' : 'Birth: ' + personToShow.date_of_birth}
          {personToShow.date_of_death === null ? '' : ' - Death: ' + personToShow.date_of_death}</p>
          <p className="scroll-content">{personToShow.details}</p>  
        </section>
    )
  }

  // arrayToObject = (array) =>
  // array.reduce((obj, item) => {
  //   obj[item.id] = item;
  //   return obj;
  // }, {});


  render() {
    const value = {
      family: this.state.family,
      addPerson: this.handleAddPerson,
      updatePerson: this.handleUpdatePerson
    };
    // const data = transformArrToView(this.state.family, this.showModal, this.state.rootId);
    // console.log(data);
    return (
      <ApiContext.Provider value={value}>
        <section className = "tree">
          <div className="custom-container">
          <Tree
            data={transformArrToView(this.state.family, this.showModal, this.state.rootId)}
            height={700}
            width={600}
            svgProps={{
              className: 'custom',
              transform: 'rotate(270)'
            }}
          /></div>
          <Modal show={this.state.show}
            onClose={this.showModal}
          >
          {this.handleShowPerson(this.state.itemId)}
          </Modal>
        </section>
      </ApiContext.Provider>
    )
  }
}