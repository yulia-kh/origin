import React from 'react';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return (
      <article>
        <h2>Origin helps you to keep track of your family history.</h2>
        <div className="landing">
        <section className="how-to-use">
          <h3 className="heading">Register an account</h3>
          <img src="register.png" alt="Register button on the top right"></img>
        </section>
        <section className="how-to-use">
          <h3 className="heading">Click on your name to open your card</h3>
          <img src="startadding.png" alt="Find add parents button"></img>
        </section>
        <section className="how-to-use">
          <h3 className="heading">Click add parents button and add your ancestors</h3>
          <img src="add.png" alt="Form to add your parents will open"></img>
        </section>
        <section className="how-to-use">
          <h3 className="heading">Enjoy the site</h3>
          <img src="tree.png" alt="Family tree view"></img>
        </section>
        </div>
      </article>
    )
  }
}