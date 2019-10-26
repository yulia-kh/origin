import React from 'react';
import Tree from 'react-tree-graph';
import Modal from '../../components/Modal/Modal';
import config from '../../config';
import ApiContext from '../../ApiContext';
import TokenService from '../../services/token-service';
import './HomePage.css';
import transformArrToView from '../../components/Utils/helpers';
import PersonToShow from '../../components/Modal/PersonToShow';

export default class HomePage extends React.Component {

  state = {
    show: false,
    itemId: '',
    family: {},
    rootId: '',
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
    const updatedFamily = this.state.family;
    updatedFamily[person.id] = person;
    this.setState({
      family:updatedFamily
    });
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
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    const value = {
      family: this.state.family,
      addPerson: this.handleAddPerson,
      updatePerson: this.handleUpdatePerson,
      deletePerson: this.handleDeletePerson,
      showModal: this.showModal,
      itemId: this.state.itemId,
      rootId: this.state.rootId
    };
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
            <PersonToShow />
          </Modal>
        </section>
      </ApiContext.Provider>
    )
  }
}