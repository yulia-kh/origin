import React from 'react';

export default class MainView extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
          <h1>Your family</h1>
        </header>
        <div class="parent">
        <section class="person-card">
          <h2>Joe Doe</h2>
          <button>Edit</button>
          <button>Delete</button>
          <button>Add relatives</button>
        </section>

        <section class="person-card">
          <h2>Janine Doe</h2>
          <button>Edit</button>
          <button>Delete</button>
          <button>Add relatives</button>
        </section>
        </div>
        <div class="center">
          <div class="connect-parents"></div>
          <div class="connect-child"></div>
        </div>
      
        <div id="self">
          <section class="person-card">
            <h2>Jane Doe</h2>
            <button>Edit</button>
            <button>Delete</button>
            <button>Add relatives</button>
          </section>
        </div>
      </>
    )
  }
}