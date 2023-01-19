import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css"

const Cards=({currentDogs})=>(
    <div className={style.dogContainer}>
        {!currentDogs.length? 
        (<section 
            className={style.noDogFound}>
            <h3>Loading...</h3>
        </section>) : 
        (currentDogs.length===1&&currentDogs[0]==="NotFound")? 
        (<section className={style.noDogFound}>
            <h1>No dogs found</h1></section>):
                (currentDogs?.map(dog =>(
                    <div key={dog.id}>
                        <Card dog={dog}/>
                    </div> )))}
    </div>
)

export default Cards;