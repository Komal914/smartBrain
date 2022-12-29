import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onGeneralModel }) => {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect faces in your pictures!"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            {" "}
            Detect
          </button>
          <button
            className="w-30 grow f4 link pv2 dib white bg-light-purple"
            onClick={onGeneralModel}
          >
            {" "}
            Describe
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLinkForm;
