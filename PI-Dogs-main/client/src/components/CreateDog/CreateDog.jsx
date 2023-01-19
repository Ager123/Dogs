import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import {postDog,getTemperaments, getDogs} from "../../actions/actions"
import { useDispatch,useSelector } from "react-redux";
import style from "./CreateDog.module.css"
import { validate, stringArrayCompare, firstCharUppercase} from "../../utils/validate";

export function CreateDog(){
    const dispatch=useDispatch();
    const history=useHistory();
    const temperaments=useSelector((state=>state.temperaments))
    
    const [errors,setErrors]=useState({
        name:"",
        height:"",
        weight:"",
        lifespan:"",
        temperaments:""
    });
    const [input,setInput]=useState({
        name:"",
        maxHeight:"",
        minHeight:"",
        height:"",
        maxWeight:"",
        minWeight:"",
        weight:"",
        lifespan:"",
        image:"",
        temperaments:[],
        newTemp:""
    })

    useEffect(()=>{
        if(!temperaments.length){
            dispatch(getTemperaments())
        }
    },[]);

    function handleAddNewTemp(event){
        event.preventDefault()
        var re= /^[a-zA-Z]*$/g;
        const regexValidate = (value,re) => re.test(value)
        if(!regexValidate(input.newTemp,re)) alert("The new temperament cannot contain special characters or numbers");
        else if(stringArrayCompare(input.newTemp,input.temperaments)) alert("Temperament already added");
        else {
            setInput({
                  ...input,
                  temperaments: [...input.temperaments,firstCharUppercase(input.newTemp)]
            })
            setErrors(validate({...input, temperaments: [...input.temperaments,firstCharUppercase(input.newTemp)]}))
        }
    }
    function handleChange(event){
        setInput({
            ...input,
            [event.target.name]:event.target.value
        })
        console.log(event.target.name)
        setErrors(validate({...input, [event.target.name]:event.target.value}))
    }
    function handleSelect(event){
        if(!input.temperaments.includes(event.target.value)){
        setInput({
            ...input,
            temperaments: [...input.temperaments,event.target.value]
        })
        setErrors(validate({...input, temperaments: [...input.temperaments,event.target.value]}))
        }
        else alert("Ese temperamento ya estaba agregado")
    }
    function handleDelete(event) {
        setInput({
          ...input,
          temperaments: input.temperaments.filter((temp) => temp !== event),
        });
        setErrors(validate({...input, temperaments: input.temperaments.filter((temp) => temp !== event)}))
    }
    function handleSubmit(event){
        event.preventDefault();
        if(Object.values(errors).join("")!=="") alert("Please complete all fields")
        else{
        let img="https://www.readersdigest.ca/wp-content/uploads/2019/04/01-Hilarious-Dog-Memes.jpg";
        const height=`${input.minHeight} - ${input.maxHeight}`;
        const weight=`${input.minWeight} - ${input.maxWeight}`
        const newDog={
            name: firstCharUppercase(input.name),
            height: height,
            weight: weight,
            avgWeight: `${(parseInt(input.maxWeight)+parseInt(input.minWeight))/2}`,
            lifespan: input.lifespan,
            image: input.image ? input.image : img ,
            temperament : input.temperaments,
            created: true
        }
        dispatch(postDog(newDog));
        dispatch(getDogs())
        dispatch(getTemperaments())
        alert("Breed correctly added");
        setInput({
            name:"",
            maxHeight:"",
            minHeight:"",
            maxWeight:"",
            minWeight:"",
            lifespan:"",
            image:"",
            temperaments:[]
        })
        history.push(`/home`);}  
        
        
    }

    return(
        <div className={style.container}>
            <Link to="/home"><button className={style.button}><b>BACK TO HOME</b></button></Link>
            
            <div className={style.formCard}>
            <h1>ADD NEW BREED</h1>
            <form onSubmit={(event)=>handleSubmit(event)} id="form1" >
                <section className={style.textInputs}>
                    <div className={style.inputRow}>
                        <label htmlFor="name" className={style.labels}>Name:</label>
                        <input type="text" value={input.name} name="name" onChange={handleChange} required="required" className={errors.name? style.warning : style.input}/>
                    </div>
                        {errors.name && (<p className={style.danger}>{errors.name}</p>)}
                    <div className={style.inputRow}>
                        <label htmlFor="weight" className={style.labels}>Weight(kg):</label>
                        <input type="text" value={input.minWeight} name="minWeight" placeholder="Min Weight..." onChange={handleChange} required="required" className={errors.weight? style.hWarning : style.hInput}/>
                        <input type="text" value={input.maxWeight} name="maxWeight" placeholder="Max Weight..." onChange={handleChange} required="required" className={errors.weight? style.hWarning : style.hInput}/>
                    </div>
                        {errors.weight && (<p className={style.danger}>{errors.weight}</p>)}
                    <div className={style.inputRow}>
                        <label htmlFor="height" className={style.labels}>Height(cm):</label>
                        <input type="text" value={input.minHeight} name="minHeight" placeholder="Min Height..." onChange={handleChange} required="required" className={errors.height? style.hWarning : style.hInput}/>
                        <input type="text" value={input.maxHeight} name="maxHeight" placeholder="Max Height..." onChange={handleChange} required="required" className={errors.height? style.hWarning : style.hInput}/>
                    </div >
                        {errors.height && (<p className={style.danger}>{errors.height}</p>)}
                    <div className={style.inputRow}>
                        <label htmlFor="lifespan" className={style.labels}>Life Span(years):</label>
                        <input type="text" value={input.lifespan} name="lifespan" placeholder="Life Span..." onChange={handleChange} className={errors.lifespan? style.warning : style.hInput}/>
                    </div>
                        {errors.lifespan && (<p className={style.danger}>{errors.lifespan}</p>)}
                    <div className={style.inputRow}>
                        <label htmlFor="image" className={style.labels}>Add image:</label>
                        <input type="text" value={input.image} name="image" placeholder="Image URL..." onChange={handleChange} className={style.input} />
                    </div>
                    <div className={style.inputRow}>
                        <label htmlFor="tempselect" className={style.labels}>Select Temp:</label>
                        <select className={errors.temperaments? style.warning : style.tempSelect}>
                        {temperaments.map((temp)=>(<option value={temp.name} key={temp.name} onClick={handleSelect}  >{temp.name}</option>))}
                        </select>
                    </div>
                        {errors.temperaments && (<p className={style.danger}>{errors.temperaments}</p>)} 
                    <hr />
                    <div className={style.inputRow}>
                        <label htmlFor="tempcreate" className={style.labels}>Or add a new one:</label>
                        <input type="text" value={input.newTemp} name="newTemp" placeholder="Add New Temperament..." onChange={handleChange} className={style.input}/>
                    </div>
                    <div className={style.tempButtonDiv}>
                        <button name="newTempButton" onClick={(event)=>handleAddNewTemp(event)} form="form1" className={style.button}>Add new temperament</button>
                    </div>
                </section>
                <div>
                    <div className={style.tempMapping}>{input.temperaments.map(temp=>(<div key={temp} className={style.tempCard}><p className={style.tempP}>{temp}</p><button onClick={() => handleDelete(temp)} className={style.xButton}>x</button></div>))}</div>
                </div>
                <button type="submit" className={style.submitButton}>ADD BREED</button>

            </form>
            </div>
        </div>
    )
}

