import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import CardList from "./components/Cardlist/Cardlist";

import ParticlesBg from "particles-bg";

import "./App.css";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  descriptions: [],
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

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
    this.setState({ box: box });
  };

  //function for the search bar
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onGeneralModel = () => {
    this.setState({ imageUrl: this.state.input });
    //calling the backend to call the clarifai API to detect
    fetch("https://stark-everglades-20344.herokuapp.com/imageDescribe", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ descriptions: data });
        console.log("RESPONSE:", data);
        if (data) {
          fetch("https://stark-everglades-20344.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              //we cannot simply set state for entries because it will change the whole user object
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (!data) {
          throw new Error("No response found!");
        }
      });
  };

  //function to detect image after button pressed
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    //calling the backend to call the clarifai API to detect
    fetch("https://stark-everglades-20344.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://stark-everglades-20344.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              //we cannot simply set state for entries because it will change the whole user object
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => {
              console.log(err);
            });
          this.displayFaceBox(this.calculateFaceLocation(response));
        }
        if (!response) {
          throw new Error("No response found!");
        }
      });
  };

  //routes for website flow
  onRouteChange = (route) => {
    //if the user is logging out
    if (route === "signout") {
      this.setState(initialState); //reset state values for next user login
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { box, route, isSignedIn, imageUrl } = this.state;
    const descriptions = this.state.descriptions;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              onGeneralModel={this.onGeneralModel}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
