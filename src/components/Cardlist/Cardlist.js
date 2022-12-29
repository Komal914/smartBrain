import React from "react";
import Card from "../Card/Card";

const CardList = ({ descriptions }) => {
  const list = () => {
    console.log("hello");
    descriptions.map((card) => console.log(card.name));
  };
  list();
  return (
    <div className="card-list">
      {descriptions.map((card) => (
        <Card key={card.id} cardname={card.name} />
      ))}
    </div>
  );
};

export default CardList;
