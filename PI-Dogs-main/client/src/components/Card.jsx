import React from "react";
import { Link } from "react-router-dom";

export default function Card({name,image,temperament, weight,id}){
    return(
        <div>
            <img src={image} alt="img no encontrada" width="200px" height="200px" />
            <Link to={`/home/${id}`} ><h3>{name}</h3></Link>
            <h5>{weight}kg</h5>
            <h5>{temperament}</h5>
        </div>
    )
}