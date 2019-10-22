import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/home'
    history.push(destination)
    this.props.updateSigninState()
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Welcome back</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}