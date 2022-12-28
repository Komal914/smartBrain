import React from "react";
import Card from "../Card/Card";

const CardList = ({ descriptions }) => {
  return (
    <div>
      {descriptions.map((user, i) => {
        return (
          <Card
            key={i}
            id={descriptions[i].id}
            name={descriptions[i].name}
            email={descriptions[i].email}
          />
        );
      })}
    </div>
  );
};

export default CardList;
