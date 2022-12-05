import React, { Component } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import axios from "axios";
import "./App.css";

//our face detection API
const app = new Clarifai.App({ apiKey: "7523494fd75c4a70b1f43a9bd6ccc4b1" });

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
    app.models
      .predict(
        "53e1df302c079b3db8a0a36033ed2d15",
        "https://samples.clarifai.com/metro-north.jpg"
      )
      .then(
        function (response) {
          console.log("hello");
        },
        function (err) {
          console.log("MANNNNNN dis sucks", err);
        }
      );
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
