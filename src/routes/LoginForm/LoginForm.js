import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    return (
      <section>
        <header>
          <h3>Welcome back</h3>
        </header>
        <form>
          <div>
            <label for="username">Email</label>
            <input type="text" name='username' id='username' />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name='password' id='password' />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </section>
    )
  }
}