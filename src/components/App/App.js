import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import AddFamilyMemberForm from '../../routes/AddFamilyMemberForm/AddFamilyMemberForm';
import EditFamilyMember from '../../routes/EditFamilyMember/EditFamilyMember';
import HomePage from '../../routes/HomePage/HomePage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import TokenService from '../../services/token-service';
import 'normalize.css';
import './App.css';


class App extends React.Component {
  state = {
    isLoggedIn: TokenService.hasAuthToken(),
    hasError: false
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  updateSigninState = () => {
    this.setState({
      isLoggedIn: TokenService.hasAuthToken()
    })
  }

  render() {
    return (
      <div className = 'App'>
        <header className='App-header'>
          <Header isLoggedIn={this.state.isLoggedIn}
          updateSigninState={this.updateSigninState}/>
        </header>
        <main className='App-main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <PublicOnlyRoute
              exact path={'/'}
              component={LandingPage} 
            />
            <PublicOnlyRoute
              path={'/login'}
              component={props => <LoginPage {...props} updateSigninState={this.updateSigninState}/>}  
            />
            <PrivateRoute 
              exact path={'/home'}
              component={HomePage}
            />
            <PublicOnlyRoute 
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateRoute 
              path={'/:id/add-parent'}
              component={AddFamilyMemberForm}
            />
            <PrivateRoute 
              path={'/:id/edit'}
              component={EditFamilyMember}
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
