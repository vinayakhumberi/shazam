import React, { Component } from 'react'

export default class Intro extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div className="jumbotron">
        <h1>Shazam</h1>
        <p>Build your canvas game from ground up</p> 
      </div>
    );
  }
}
