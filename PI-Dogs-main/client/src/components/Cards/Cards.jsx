import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css"

const Cards=({currentDogs})=>(
    <div className={style.dogContainer}>
        {currentDogs?.map(dog =>(
            <div key={dog.id}>
            <Card dog={dog}/>
            </div> ))}
    </div>
)

export default Cards;