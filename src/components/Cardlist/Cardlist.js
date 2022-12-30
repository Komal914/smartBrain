import React from "react";
import Card from "../Card/Card";
import "./Cardlist.css";

const CardList = ({ descriptions }) => {
  return (
    <div className="card-list">
      {descriptions.map((card) => (
        <Card key={card.id} cardname={card.name} />
      ))}
    </div>
  );
};

export default CardList;
