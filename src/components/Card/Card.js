import React from "react";

const Card = (props) => {
  return (
    <div className="br2 dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center hover-light-green">
      <h2> {props.cardname}</h2>
    </div>
  );
};

export default Card;
