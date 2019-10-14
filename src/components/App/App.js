import React from 'react';
import Header from '../Header/Header';
import Loginform from '../../routes/LoginForm/LoginForm';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../../routes/LandingPage/LandingPage';
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
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div> 
    );
  }
  
}

export default App;
