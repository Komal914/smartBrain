import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  //function for the search bar
  onInputChange = (event) => {
    console.log(event.target.value);
  };

  //function to detect image after button pressed
  onButtonSubmit = () => {
    console.log("button pressed");
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
      </div>
    );
  }
}

export default App;
