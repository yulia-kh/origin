import React from 'react';
import { Route, Switch } from 'react-router-dom';
import config from '../../config';
import Header from '../Header/Header';
import Loginform from '../../routes/LoginForm/LoginForm';
import RegistrationForm from '../../routes/RegistrationForm/RegistrationForm';
import LandingPage from '../../routes/LandingPage/LandingPage';
import AddFamilyMemberForm from '../../routes/AddFamilyMemberForm/AddFamilyMemberForm';
import EditFamilyMember from '../../routes/EditFamilyMember/EditFamilyMember';
import HomePage from '../../routes/HomePage/HomePage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import ApiContext from '../../ApiContext';
import './App.css';

class App extends React.Component {
  state = {
    parents: []
  }

  handleUpdatePerson = (updatedPerson, id) => {
    id = parseInt(id);
    updatedPerson = {
      ...updatedPerson,
      id
    }
    this.setState({parents: this.state.parents.map(person => 
      person.id === id ? updatedPerson : person)});

  }

  handleDeletePerson = (personId) => {
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
    fetch(`${config.API_ENDPOINT}/persons/1/tree`)
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
      .then(res => this.setState({parents: res})
      )
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    const value = {
      parents: this.state.parents,
      deletePerson: this.handleDeletePerson,
      addPerson: this.handleAddPerson,
      updatePerson: this.handleUpdatePerson
    };

    return (
      <ApiContext.Provider value={value}>
        <div className = 'App'>
          <header className='App-header'>
            <Header />
          </header>
          <main className='App-main'>
            <Switch>
              <Route
                exact path={'/'}
                component={LandingPage} 
              />
              <Route
                path={'/login'}
                component={Loginform}  
              />
              <Route 
                path={'/home'}
                component={HomePage}
              />
              <Route 
                path={'/register'}
                component={RegistrationForm}
              />
              <Route 
                path={'/:id/add-parent'}
                component={AddFamilyMemberForm}
              />
              <Route 
                path={'/:id/edit'}
                component={EditFamilyMember}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
        </div> 
      </ApiContext.Provider>
      
    );
  }
  
}

export default App;
