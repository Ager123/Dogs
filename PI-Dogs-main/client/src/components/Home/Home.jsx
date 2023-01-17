import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDogs,
        filterByOrigin,
        orderByName,
        getTemperaments,
        filterByTemperament,
        orderByWeight} from "../../actions/actions"
import Cards from "../Cards/Cards";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Navbar from "../Navbar/Navbar";
import Selectors from "../Selectors/Selectors";
import style from "./Home.module.css"

export default function Home (){
    const dispatch=useDispatch();
    const allDogs=useSelector((state=>state.dogs));
    const temperaments=useSelector(state=>state.temperaments)
    // const errors=useSelector(state=>state.error)
    // console.log (allDogs)
    if(!allDogs.length) dispatch(getDogs())
    // useEffect(()=>dispatch(getDogs()),[dispatch]);
    useEffect(()=>dispatch(getTemperaments()),[dispatch]);

    const [currentPage, setCurrentPage]=useState(1);
    // eslint-disable-next-line
    const [dogsXPage , setDogsXPage]=useState(8);
    // eslint-disable-next-line
    const [order, setOrder]=useState("");

    const lastDogIndex=currentPage*dogsXPage;
    const firstDogIndex=lastDogIndex-dogsXPage;
    const currentDogs=allDogs.slice(firstDogIndex,lastDogIndex);

    const paginado = (pNumber) => setCurrentPage(pNumber);
    
    // const pesos=allDogs.map(dog=>dog.height)
    // console.log (pesos)

    // console.log(allDogs[0])

    function clicHandler(){
        dispatch(getDogs())
        setCurrentPage(1)
    }

    function handleFilterOrigin(e){
        dispatch(filterByOrigin(e.target.value))
        setCurrentPage(1)
    }

    function handleTempFilter(e){
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1)
    }
    
    function handleSortByName(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(e.target.value)
    }
    
    function handleWeightOrder(e){
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrder(e.target.value)
    }

    return(
                
        <div className={style.container}>
            <Navbar className={style.Navbar}/>
            <SearchBar clicHandler={clicHandler} /> 
            
            <div className={style.displayBox}>
                <section className={style.filters}>
                <Selectors 
                handleSortByName={handleSortByName} 
                handleWeightOrder={handleWeightOrder} 
                handleTempFilter={handleTempFilter}
                handleFilterOrigin={handleFilterOrigin}
                temperaments={temperaments} />
                </section>
                <section className={style.cardsContainer} >
                    <Paginado dogsXPage={dogsXPage} totalDogs={allDogs.length} paginado={paginado} currentPage={currentPage}/>
                    <Cards currentDogs={currentDogs}/>
                    <Paginado dogsXPage={dogsXPage} totalDogs={allDogs.length} paginado={paginado} currentPage={currentPage}/>
                </section>
            </div>
        </div>
    )
};
