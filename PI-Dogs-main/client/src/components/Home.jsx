import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../actions/actions";
import {Link} from "react-router-dom";
import Card from "../components/Card";
import Paginado from "./Paginado";

// import { Connect } from "react-redux";

export default function Home (){
    const dispatch=useDispatch();
    const allDogs=useSelector((state=>state.dogs));
    useEffect(()=>{dispatch(getDogs())},[]);

    const [currentPage, setCurrentPage]=useState(1);
    const [dogsXPage , setDogsXPage]=useState(8);

    const lastDogIndex=currentPage*dogsXPage;
    const firstDogIndex=lastDogIndex-dogsXPage;
    const currentDogs=allDogs.slice(firstDogIndex,lastDogIndex);

    const paginado = (pNumber) => setCurrentPage(pNumber);
    

    // console.log(allDogs[0])

    function clicHandler(evento){
        evento.preventDefault()
        return dispatch(getDogs())
        
    }

    return(
        <div>
            <Link to="/dogs/add" >Agregar Raza</Link>
            <button onClick={clicHandler}>Recargar</button>
            <div>
                <h5>ordenar por: orden alfabetico y peso</h5>
                <select key="orden_alfabetico" >
                    <option value="asc" key="alf.asc">Ascendente</option>
                    <option value="des" key="alf.des">Descendente</option>
                </select>
                <select key="orden_peso" >
                    <option value="asc" key="wei.asc">Ascendente</option>
                    <option value="des" key="wei.des">Descendente</option>
                </select>
                <h5 >filtrar por: temperamento y origen</h5>
                <select key="filtro_origen">
                    <option value="asc" key="ori.all">Todos</option>
                    <option value="des" key="ori.app">Importados</option>
                    <option value="des" key="ori.new">Agregados</option>
                </select>

            <Paginado 
            dogsXPage={dogsXPage} 
            totalDogs={allDogs.length} 
            paginado={paginado} 
            />
            {currentDogs?.map(dog =>{
            return(
                <div>
                    <Card name={dog.name} image={dog.image} temperament={dog.temperament} weight={dog.weight} id={dog.id} key={dog.id} />
                </div> )})} 
            </div>
        </div>
    )
};
