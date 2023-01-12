import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs,filterByOrigin,orderByName } from "../actions/actions";
import {Link} from "react-router-dom";
import Card from "../components/Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

// import { Connect } from "react-redux";

export default function Home (){
    const dispatch=useDispatch();
    const allDogs=useSelector((state=>state.dogs));
    console.log (allDogs)
    useEffect(()=>{dispatch(getDogs())},[]);

    const [currentPage, setCurrentPage]=useState(1);
    const [dogsXPage , setDogsXPage]=useState(8);
    const [order, setOrder]=useState("");

    const lastDogIndex=currentPage*dogsXPage;
    const firstDogIndex=lastDogIndex-dogsXPage;
    const currentDogs=allDogs.slice(firstDogIndex,lastDogIndex);

    const paginado = (pNumber) => setCurrentPage(pNumber);
    

    // console.log(allDogs[0])

    function clicHandler(evento){
        evento.preventDefault()
        return dispatch(getDogs())
    }
    function handleFilterOrigin(e){
        dispatch(filterByOrigin(e.target.value))
    }
    function handleSortByName(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(e.target.value)

    }

    return(
                
        <div>
            <Navbar/>
            <Link to="/dogs/add" >Agregar Raza</Link>
            <button onClick={clicHandler}>Recargar</button>
            <div>
                <h5>ordenar por: orden alfabetico y peso</h5>
                <select key="orden_alfabetico" onChange={e=>handleSortByName(e)}>
                    <option value="asc" key="alf.asc">A-Z</option>
                    <option value="des" key="alf.des">Z-A</option>
                </select>
                <select key="orden_peso" >
                    <option value="asc" key="wei.asc">Mas pesado</option>
                    <option value="des" key="wei.des">Menos pesado</option>
                </select>
                <h5 >filtrar por: temperamento y origen</h5>
                <select key="filtro_origen" onChange={e=>handleFilterOrigin(e)}>
                    <option value="All" key="ori.all">Todos</option>
                    <option value="API" key="ori.app">Importados</option>
                    <option value="created" key="ori.new">Agregados</option>
                </select>
            <SearchBar />
            <Paginado 
            dogsXPage={dogsXPage} 
            totalDogs={allDogs.length} 
            paginado={paginado} 
            />
            {currentDogs?.map(dog =>{
                // if(dog.created) {
                //     const temperaments2=temperaments.map(obj=>obj.name);
                //         tempstring=temperaments2.toString()
                //         dog={...dog, temperament: tempstring}}  
            return(
                <div>
                    <Card name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight} id={dog.id} key={dog.id} />
                </div> )})} 
            </div>
        </div>
    )
};
