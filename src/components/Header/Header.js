import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'

export default class Header extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.props.updateSigninState();
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
    return (
      <nav>
        <Link to='/home' className='title'><h1>ORIGIN</h1></Link>
        {this.props.isLoggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    )  
  }
}