import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getDogsById } from "../../actions/actions";

export default function DogDetail (){
    const {id} = useParams()
    const dispatch = useDispatch()
    const [detail,setDetail]=useState({});
    const serverError=useSelector(state=>state.error);
    console.log(serverError.message)

    useEffect(() => {
        dispatch(getDogsById(id))
        // eslint-disable-next-line
    }, []);
    
    const dog=useSelector(state=>state.detailedDog)

    useEffect(()=>{
        // eslint-disable-next-line
       if(dog.id==id) setDetail(dog)
       // eslint-disable-next-line
    },[dog]);
    // console.log(detail)

    if(!detail.temperament&&detail.temperaments){
        const temperaments2=detail.temperaments.map(obj=>obj.name);
        const tempstring=temperaments2.toString()
        detail.temperament=tempstring
    }

    return(
        <>
        {// eslint-disable-next-line
        (dog.id==id) ? 
        <div>
            <Link to="/home"><button>Back to Home</button></Link>
            <h2>Breed details id={id}</h2>
            <img src={detail.image} alt={detail.name} width="50%" height="50%"/>
            <h2>{detail.name}</h2>
            <h4>Temperaments: {detail.temperament}</h4>
            <h4>Height: {detail.height} cm</h4>
            <h4>Weight: {detail.weight} kg</h4>
            {detail.lifespan && <h4>Life Span: {detail.lifespan}</h4>}
        </div> :
        <h3>Loading...</h3>}
        </>
    )
}