import React from "react";
import style from "./Selectors.module.css"

const Selectors= ({handleSortByName,handleWeightOrder,handleTempFilter,handleFilterOrigin,temperaments})=>{


    return(
                <div className={style.selectors} >
                    <h5>ordenar por: orden alfabetico y peso</h5>
                    <select key="orden_alfabetico" onChange={(e)=>handleSortByName(e)}>
                        <option value="asc" key="alf.asc">A-Z</option>
                        <option value="des" key="alf.des">Z-A</option>
                    </select>
                    <select key="orden_peso" onChange={(e)=>handleWeightOrder(e)} >
                    <option value="asc" key="wei.asc">Mas liviano</option>
                    <option value="des" key="wei.des">Mas pesado</option>
                    </select>
                    <h5 >filtrar por: temperamento y origen</h5>
                    <select>
                    {temperaments.map((temp)=>(<option value={temp.name} key={temp.name} onClick={(e)=>handleTempFilter(e)}>{temp.name} </option>))}
                    </select>
                    <select key="filtro_origen" onChange={(e)=>handleFilterOrigin(e)}>
                    <option value="All" key="ori.all">Todos</option>
                    <option value="API" key="ori.app">Importados</option>
                    <option value="created" key="ori.new">Agregados</option>
                    </select>
                </div>
    )
}
export default Selectors;