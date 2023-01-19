import React from "react";
import style from "./Card.module.css"
import { useHistory } from "react-router-dom";

export default function Card(dog){
    const history=useHistory()
    if(dog.dog.temperaments){
        const temperaments2=dog.dog.temperaments.map(obj=>obj.name);
        const tempstring=temperaments2.toString()
        dog.dog.temperament=tempstring
    }
    // const flag=dog.dog.noDog;
    
    const clickHandler = () =>{
        history.push(`/dogs/${dog.dog.id}`)
    }
    return(
        <div onClick={()=>clickHandler()} 
            className={style.link} >
            <div className={style.card}>
                <img src={dog.dog.image} alt={dog.dog.name} className={style.image} />
                <section className={style.cardText}>
                    <h3 className={style.name}>{dog.dog.name}</h3>
                    {dog.dog.avgWeight!=="500" ? 
                        <h5 className={style.text}
                        >Average weight: {dog.dog.avgWeight}kg</h5> :
                        <h5 className={style.text}
                        >Average weight: {dog.dog.weight}</h5>}
                    <h5 className={style.text}>Temperaments: {dog.dog.temperament}</h5>
                </section>
            </div>
        </div>
    )
}



