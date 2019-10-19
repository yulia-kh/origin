import React from 'react';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

export default class LoginForm extends React.Component {

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.history.push('/home')
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    return (
      <section>
        <header>
          <h3>Welcome back</h3>
        </header>
        <form onSubmit={this.handleSubmitJwtAuth}>
          <div>
            <label htmlFor="username">User name</label>
            <input type="text" name='user_name' id='username' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </section>
    )
  }
}