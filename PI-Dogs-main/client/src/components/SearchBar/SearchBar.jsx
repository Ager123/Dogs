import React from "react";
import style from "./SearchBar.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../actions/actions";

export default function SearchBar (props){
    const dispatch=useDispatch();
    const [name,setName]=useState("");

    const handleInput = (event)=>{
        setName(event.target.value);
    };
    const handleSubmit = (event)=>{
        event.preventDefault()
        dispatch(getDogsByName(name))
    };

    return(
        <div className={style.container}>
            <h1 className={style.title} >DOG APP</h1>
            <section className={style.searchSection}>
                <input type="text" 
                    placeholder="Breed search..." 
                    onChange={handleInput} 
                    className={style.searchInput} />
                <button type="submit" 
                    onClick={handleSubmit} 
                    className={style.submitButton} >SEARCH
                </button>
                <button 
                    onClick={()=>props.clicHandler()} 
                    className={style.clearButton} >CLEAN FILTERS
                </button>
            </section>
        </div>
    )
}