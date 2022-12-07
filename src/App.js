import React, { Component } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import Rank from "./components/Rank/Rank";

import ParticlesBg from "particles-bg";

import "./App.css";

//our face detection API
const app = new Clarifai.App({
  apiKey: "7523494fd75c4a70b1f43a9bd6ccc4b1",
});
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifai_face =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifai_face.left_col * width,
      topRow: clarifai_face.top_row * height,
      rightCol: width - clarifai_face.right_col * width,
      bottomRow: height - clarifai_face.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log("THIS IS THE B", box);
    this.setState({ box: box });
    console.log("STATE: ", this.state.box);
  };

  //function for the search bar
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  //function to detect image after button pressed
  onButtonSubmit = () => {
    console.log("button pressed");
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response)).catch((err) =>
          console.log(err)
        )
      );
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ParticlesBg type="cobweb" bg={true} />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
