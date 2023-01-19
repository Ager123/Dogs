import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getDogsById } from "../../actions/actions";
import NavBar from "../Navbar/Navbar"
import style from "./DogDetail.module.css"

export default function DogDetail (){
    const {id} = useParams()
    const dispatch = useDispatch()
    const [detail,setDetail]=useState({});

    useEffect(() => {
        dispatch(getDogsById(id))
    }, []);
    
    const dog=useSelector(state=>state.detailedDog)

    useEffect(()=>{
       if(dog.id==id) setDetail(dog)
    },[dog]);

    if(!detail.temperament&&detail.temperaments){
        const temperaments2=detail.temperaments.map(obj=>obj.name);
        const tempstring=temperaments2.toString()
        detail.temperament=tempstring
    }
    return(
        <div className={style.container}>
            <section className={style.topSection}>
                <NavBar />
                <Link to="/home" ><button className={style.button}>BACK TO HOME</button></Link>
            </section>
        {
        (parseInt(dog.id)===parseInt(id)) ? 
        <div className={style.details}>
            <h1 className={style.title}>{detail.name}</h1>
            <section className={style.imageAndText}>
                <img src={detail.image} alt={detail.name} className={style.image}/>
                <section className={style.textData}>
                    <p className={style.parrafo}><b>Temperaments: </b>{detail.temperament}</p>
                    <p className={style.parrafo}><b>Height: </b>{detail.height} cm</p>
                    <p className={style.parrafo}><b>Weight: </b>{detail.weight} kg</p>
                    {detail.lifespan && <p className={style.parrafo}><b>Life Span: </b>{detail.lifespan}</p>}
                </section>
            </section>
        </div> : (dog==="NotFound")? <h3>There's no dog with the specified ID</h3>:
            <h3>Loading...</h3>}
        </div>
    )
}