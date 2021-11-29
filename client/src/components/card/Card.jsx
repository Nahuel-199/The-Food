import React from 'react';
import { BsFillStarFill } from "react-icons/bs";
import './card.css';

export default function Card({ name, image, diets,healthScore  }) {
    return (
        <div className="container-cards">
        <div className="cards-name">
            <img className="card-img"src={image} alt="img Not Found" width="150px" height="130px" />
            <h3 className="name-card">{name}</h3>
            <h5 className="card-diets">Diets: {diets + ' '}</h5>
            <p>{healthScore}</p>
            <BsFillStarFill className="card-score"></BsFillStarFill>
            </div>
        </div>
    );
}