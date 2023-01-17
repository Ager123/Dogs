import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import {postDog,getTemperaments, getDogs} from "../../actions/actions"
import { useDispatch,useSelector } from "react-redux";



export function CreateDog(){
    const dispatch=useDispatch();
    const history=useHistory();
    const temperaments=useSelector((state=>state.temperaments))
    // const newId=useSelector(state=>state.newId)
    // console.log(temperaments)
    
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

    // function isImgUrl(url) {
    //     const img = new Image();
    //     img.src = url;
    //     return new Promise((resolve) => {
    //       img.onerror = () => resolve(false);
    //       img.onload = () => resolve(true);
    //     });
    // }

    function validate(input){
        let error={}

        if(!input.name) error={...error,name:"El Nombre es obligatorio"}
        else if(input.name.length>=50) error={...error,name:"El nombre ingresado es demasiado largo"}
        else error={...errors,name:""}
        
        if(!input.temperaments.length){
            error={...error,temperaments:"You must select at least 1 temperament"}
        }else{
            error={...error,temperaments:""};
        }
        
        if(!input.maxWeight || !input.minWeight) error={...error,weight:"There must be Max and Min weight"}
        else if(isNaN(input.maxHeight)||isNaN(input.minHeight)) error={...error,weight:"Weight must be a number"}     
        else if(input.maxWeight<1||input.minWeight<1) error={...error,weight:"Weight must be higher than 0 kg"}     
        else if(input.maxWeight>200 ||input.minWeight>200) error={...error,weight:"Weight must be lesser than 200 kg"}     
        else if(parseInt(input.maxWeight)<parseInt(input.minWeight)) error={...error,weight:"Max weight must be higher than min weight"}     
        else error={...error,weight:""};
        
        if(!input.maxHeight || !input.minHeight) error={...error,height:"There must be Max and Min height"}
        else if(isNaN(input.maxHeight)||isNaN(input.minHeight)) error={...error,height:"Height must be a number"}     
        else if(input.maxHeight<0||input.minHeight<0) error={...error,height:"Height must be higher than 0 cm"}     
        else if(input.maxHeight>200 ||input.minHeight>200) error={...error,height:"Height must be lesser than 200 cm"}     
        else if(parseInt(input.maxHeight)<parseInt(input.minHeight)) error={...error,height:"Max height must be higher than min height"}     
        else error={...error,height:""};

        if(!input.lifespan) error={...error,lifespan:"Missing Life Span"}
        else if(isNaN(input.lifespan)) error={...error,lifespan:"Life Span must be a number"}
        else if(input.lifespan<1||input.lifespan>50) error={...error,lifespan:"Life Span must be a number between 1 and 50"} 
        else error={...error,lifespan:""};

        return error
    }
    // eslint-disable-next-line
    useEffect(()=>dispatch(getTemperaments()),[dispatch]);
    
    // useEffect(()=>{
    //     if(input.name){validate()}
    // },[input]);
    
    function handleAddNewTemp(event){
        event.preventDefault()
        if(temperaments.includes(input.newTemp)) alert("Temperament already exists");
        else if(input.temperaments.includes(input.newTemp)) alert("Temperament already added");
        else {
            setInput({
                  ...input,
                  temperaments: [...input.temperaments,input.newTemp]
            })}
    }
    function handleChange(event){
        setInput({
            ...input,
            [event.target.name]:event.target.value
        })
        setErrors(validate({...input, [event.target.name]:event.target.value}))
    }
    function handleSelect(event){
        if(!input.temperaments.includes(event.target.value)){
        setInput({
            ...input,
            temperaments: [...input.temperaments,event.target.value]
        })}
        else alert("Ese temperamento ya estaba agregado")
    }
    function handleDelete(event) {
        setInput({
          ...input,
          temperaments: input.temperaments.filter((temp) => temp !== event),
        });
    }
    function handleSubmit(event){
        event.preventDefault();
        if(Object.values(errors).join("")!=="") alert("Please complete all fields") 
        else{
        let img="https://www.readersdigest.ca/wp-content/uploads/2019/04/01-Hilarious-Dog-Memes.jpg";
        const height=`${input.minHeight} - ${input.maxHeight}`;
        const weight=`${input.minWeight} - ${input.maxWeight}`
        const newDog={
            name: input.name,
            height: height,
            weight: weight,
            avgWeight: `${(parseInt(input.maxWeight)+parseInt(input.minWeight))/2}`,
            lifespan: input.lifespan,
            image: input.image ? input.image : img ,
            temperament : input.temperaments,
            created: true
        }
        let newId=""
        dispatch(postDog(newDog));
        dispatch(getDogs())
        alert("Se ha agregado la raza");
        console.log(newId)
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
        <div>
            <Link to="/home"><button>Back to Home</button></Link>
            <h1>Add new Breed</h1>
            <form onSubmit={(event)=>handleSubmit(event)} id="form1" >
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} required="required" className={errors.name && "warning"}/>
                    {errors.name && (<p className="danger">{errors.name}</p>)}
                </div>
                <div>
                    <label htmlFor="weight">Weight(kg)</label>
                    <input type="number" value={input.minWeight} name="minWeight" placeholder="Min Weight..." onChange={handleChange} required="required" className={errors.weight && "warning"}/>
                    <input type="number" value={input.maxWeight} name="maxWeight" placeholder="Max Weight..." onChange={handleChange} required="required" className={errors.weight && "warning"}/>
                    {errors.weight && (<p className="danger">{errors.weight}</p>)}
                </div>
                <div>
                    <label htmlFor="height">Height(cm)</label>
                    <input type="number" value={input.minHeight} name="minHeight" placeholder="Min Height..." onChange={handleChange} required="required" className={errors.height && "warning"}/>
                    <input type="number" value={input.maxHeight} name="maxHeight" placeholder="Max Height..." onChange={handleChange} required="required" className={errors.height && "warning"}/>
                    {errors.height && (<p className="danger">{errors.height}</p>)}
                </div>
                <div>
                    <label htmlFor="lifespan">Life Span(years)</label>
                    <input type="text" value={input.lifespan} name="lifespan" placeholder="Life Span..." onChange={handleChange} required="required" className={errors.lifespan && "warning"}/>
                    {errors.lifespan && (<p className="danger">{errors.lifespan}</p>)}
                </div>
                <div>
                    <label htmlFor="image">Load image</label>
                    <input type="text" value={input.image} name="image" placeholder="Image URL..." onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="tempselect">Selecciona un temperamento:</label>
                    <div>{input.temperaments.map(temp=>(<div key={temp}><p>{temp}</p><button onClick={() => handleDelete(temp)}>x</button></div>))}</div>
                    <div>
                        <label htmlFor="tempcreate">O agrega uno nuevo:</label>
                        <input type="text" value={input.newTemp} name="newTemp" placeholder="Add New Temperament..." onChange={handleChange} />
                        <button name="newTempButton" onClick={(event)=>handleAddNewTemp(event)} form="form1">Add new temperament</button>
                    
                    </div>
                    <select>
                        {temperaments.map((temp)=>(<option value={temp.name} key={temp.name} onClick={handleSelect} className={errors.temperaments && "warning"} >{temp.name}</option>))}
                    </select>
                    {errors.temperaments && (<p className="danger">{errors.temperaments}</p>)} 
                </div>
                <button type="submit" >ADD BREED</button>

            </form>
        </div>
    )
}