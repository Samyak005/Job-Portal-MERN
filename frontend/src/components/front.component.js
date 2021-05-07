import React, { Component } from 'react';

export default class Front extends Component {

  render() {
    const welcome = {
      padding: "10px",
      backgroundColor: "blue",
      fontFamily: "Lato",
      justifyContent: "center",
      color: "white",
      alignItems: "center"
    };

    const tagline = {
      padding: "10px",
      fontFamily: "Lato",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      backgroundColor: "green",

    };
    return (
      <div>
          <h1 style={welcome}>Welcome to Naukri!</h1>
          <h4 style={tagline}>Where jobs are found</h4>
        </div>
    );
  }
}