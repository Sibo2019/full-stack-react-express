//This is the landing page.

import "../App.css";
import React, { Component } from "react";
import Results from "./Results";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    //Initialize states
    this.state = {
      username: "",
      isLoadedGithub: false,
      githubItems: {},
      showResults: false,
    };
  }

  //Fetch inforamtion from API

  //Github
  componentDidMountGithub() {
    fetch("/search/github/" + this.state.username)
      .then((res) => res.json())
      .then((json) => {
        //Set isLoadedGithub and items state, with information from the API
        this.setState({
          isLoadedGithub: true,
          githubItems: json,
        });
      });
  }

  //When text is inputted change the state of "word"
  handleInput = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  //When the submit button is pressed, change the state of "showResults" to true
  handleSubmit = (event) => {
    this.componentDidMountGithub();
    this.setState({
      showResults: true,
    });
    event.preventDefault();
  };

  render() {
    if (!this.state.showResults) {    //If show results is false - show the search page
      return (
        <div className="container">
          <div className="content">
            <h1>Search  username</h1>

            <form onSubmit={this.handleSubmit}>
              <input
                type={"text"}
                value={this.state.username}
                onChange={this.handleInput}
              ></input>
              <br />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      );
    } else if (   //If showResults is true, and both github and gitlabs is loaded, call the results component
      this.state.showResults &&
      this.state.isLoadedGithub 
    ) {
      return (
        <div>
          <div className="container">
            <Results
              githubItems={this.state.githubItems}    //Pass in githubItems
            />
          </div>
        </div>
      );
    } else {    //Else, show the laoding screen
      return (
        <div>
          <div className="container">
            <div className="content">
              <h1>Loading</h1>

              <form onSubmit={this.handleSubmit}>
                <input
                  type={"text"}
                  value={this.state.username}
                  onChange={this.handleInput}
                ></input>
                <br />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
