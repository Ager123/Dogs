import React from "react";
import { orderByName } from "../../actions/actions";
import style from "./Selectors.module.css"


const Selectors= ({handleSortByName,handleWeightOrder,handleTempFilter,handleFilterOrigin,temperaments,order,handleLifespanFilter})=>{
    return(
        <div className={style.container} >
            <section className={style.sections}>
                <h5 className={style.boldText}>ORDER</h5>
                <p className={style.simpleText}>Alphabetical:</p>
                <select key="orden_alfabetico" 
                onChange={(e)=>handleSortByName(e)} 
                className={style.selector}
                value={order.name}>
                    <option value="asc" key="alf.asc">A-Z</option>
                    <option value="des" key="alf.des">Z-A</option>
                </select>
                <p className={style.simpleText}>Weight:</p>                
                <select key="orden_peso" 
                onChange={(e)=>handleWeightOrder(e)} 
                className={style.selector}
                value={order.weight}>
                    <option value="asc" key="wei.asc">Lighter</option>
                    <option value="des" key="wei.des">Heavier</option>
                </select>
            </section>
            <section className={style.sections} >
                <h5 className={style.boldText}>FILTER</h5>
                <p className={style.simpleText}>Temperaments:</p>
                <select className={style.selector}>
                    {temperaments.map((temp)=>(
                        <option value={temp.name} 
                        key={temp.name} 
                        onClick={(e)=>handleTempFilter(e)}>{temp.name} 
                        </option>))}
                </select>
                <p className={style.simpleText}>Source:</p>
                <select key="filtro_origen" 
                onChange={(e)=>handleFilterOrigin(e)} 
                className={style.selector}>
                    <option value="All" key="ori.all">All</option>
                    <option value="API" key="ori.app">API Imported</option>
                    <option value="created" key="ori.new">Added</option>
                </select>
                <p className={style.simpleText}>Lifespan:</p>
                <select className={style.selector}
                onChange={(e)=>handleLifespanFilter(e)}>
                    <option value="10" key="10years">{"<10 years"}</option>
                    <option value="8" key="8years">{"<8 years"}</option>
                </select>
            </section>
        </div>
    )
}
export default Selectors;