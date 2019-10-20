import React from 'react';
import AuthApiService from '../../services/auth-api-service';

export default class RegistrationForm extends React.Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, user_name, password } = ev.target

  this.setState({ error: null })
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value
    })
      .then(user => {
        first_name.value = ''
        last_name.value = ''
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    const { error } = this.state
    return (
      <form 
        className='signup-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div>
          <label htmlFor="registration__first_name">First name</label>
          <input placeholder='First name' type="text" name='first_name' id='Registration__first_name' />
          <label htmlFor="registration__last_name">Last name</label>
          <input placeholder='Last name' type="text" name='last_name' id='Registration__last_name' />
        </div>
        <div>
          <label htmlFor="username">User name</label>
          <input type="text" name='user_name' id='username' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    )
  }
}