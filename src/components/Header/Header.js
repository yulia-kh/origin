import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'

export default class Header extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/register'>
          Register
        </Link>
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }

  render() {
    console.log(TokenService.hasAuthToken());
    return (
      <nav>
        <Link to='/home'><h1>Origin</h1></Link>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    )  
  }
}