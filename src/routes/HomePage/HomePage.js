import React from 'react';
import { Link } from 'react-router-dom';
import Tree from 'react-tree-graph';
// import 'react-tree-graph/dist/style.css';
import Modal from '../../components/Modal/Modal';
import config from '../../config';
import ApiContext from '../../ApiContext';
import TokenService from '../../services/token-service';
import './HomePage.css';

export default class HomePage extends React.Component {
  static contextType = ApiContext;
  state = {
    show: false,
    itemId: '',
    family: {}
  }

  showModal = person => {
    this.setState({
      selectedPerson: person,
      show: !this.state.show,
    });
  }

  formatTree(node){
    node.name = `${node.first_name} ${node.last_name}`;
    node.textProps = {x: 25, y: -40};
    node.children = node.parents.map(childNode => this.formatTree(childNode));
    delete node.parents;
    node.gProps = {
      onClick: (event) => {this.showModal(node)}
    }
    return node;
  }

  handleUpdatePerson = (updatedPerson, id) => {
    this.loadTree();
  }

  handleAddPerson = (person) => {
    this.loadTree();
  }

  loadTree() {
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
        family: this.formatTree(res)
      });
    })
    .catch(error => {
      console.error({error})
    });
  }

  componentDidMount() {
    this.loadTree();
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
        // const tree = this.state.family;
        // if (tree.id === id) {
        //   tree
        this.loadTree();
      })
      .catch(error => {
        console.error({error})
      })
  }

  handleShowPerson = (person) => {

    const personToShow = {
      first_name: '',
      last_name: '',
      ...person
    }
    
    return (
      this.state.family.id === personToShow.id) ?
        <section>
          <div className='button-container'>
            <Link to={`${personToShow.id}/edit`}><button class="edit">Edit</button></Link>
            <Link to={`${personToShow.id}/add-parent`}><button class='add'>Add parents</button></Link>
          </div>
          <h3 className="modal-title">{personToShow.first_name + ' ' + personToShow.last_name}</h3>
          <p class="date">{personToShow.date_of_birth === null ? '' : 'Birth: ' + personToShow.date_of_birth}
          {personToShow.date_of_death === null ? '' : ' - Death: ' + personToShow.date_of_death}</p>
          <p className="scroll-content">{personToShow.details}</p>
        </section> :
        <section>
          <div className='button-container'>
            <Link to={`${personToShow.id}/edit`}><button class="edit">Edit</button></Link>
            <button onClick={() => {this.handleDeletePerson(personToShow.id); this.showModal()}} class="delete">Delete</button>
            <Link to={`${personToShow.id}/add-parent`}><button class='add'>Add parents</button></Link>
          </div>
          <h3 className="modal-title">{personToShow.first_name + ' ' + personToShow.last_name}</h3>
          <p class="date">{personToShow.date_of_birth === null ? '' : 'Birth: ' + personToShow.date_of_birth}
          {personToShow.date_of_death === null ? '' : ' - Death: ' + personToShow.date_of_death}</p>
          <p className="scroll-content">{personToShow.details}</p>  
        </section>
  }

  render() {
    const value = {
      family: this.state.family,
      addPerson: this.handleAddPerson,
      updatePerson: this.handleUpdatePerson
    };

    return (
      <ApiContext.Provider value={value}>
        <section className = "tree">
          <div className="custom-container">
          <Tree
            data={this.state.family}
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
          {this.handleShowPerson(this.state.selectedPerson)}
          </Modal>
        </section>
      </ApiContext.Provider>
    )
  }
}