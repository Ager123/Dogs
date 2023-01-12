import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCharacterByName } from "../actions/actions";

export default function SearchBar (){
    const dispatch=useDispatch();
    const [name,setName]=useState("");

    const handleInput = (e)=>{
        e.preventDefault();
        setName(e.target.value);
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(getCharacterByName(name))
    };

    return(
        <div>
            <label>Buscar:</label>
            <input type="text" placeholder="Ingrese raza..." onChange={handleInput} />
            <button type="submit" onClick={handleSubmit} >Buscar</button>
        </div>
    )
}