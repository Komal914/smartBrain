import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 ">
      <Tilt
        className="Tilt br2"
        style={{
          height: "100px",
          width: "100px",
        }}
        options={{ tiltEnable: false }}
        glareEnable={true}
        glareMaxOpacity={0.9}
        glareColor="lightblue"
        glarePosition="all"
      >
        <div className="Tilt-inner pa3">
          <img alt="logo" src={brain}></img>
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
