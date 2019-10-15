import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Loginform from '../../routes/LoginForm/LoginForm';
import RegistrationForm from '../../routes/RegistrationForm/RegistrationForm';
import LandingPage from '../../routes/LandingPage/LandingPage';
import AddFamilyMemberForm from '../../routes/AddFamilyMemberForm/AddFamilyMemberForm';
import HomePage from '../../routes/HomePage/HomePage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends React.Component {
  render() {
    return (
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
              path={'/add-parent'}
              component={AddFamilyMemberForm}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div> 
    );
  }
  
}

export default App;
