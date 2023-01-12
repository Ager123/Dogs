import React from "react";

export default function Paginado ({dogsXPage,totalDogs,paginado} ){
    const pageNumbers=[];
    for(let i=0;i<Math.ceil(totalDogs/dogsXPage);i++){
        pageNumbers.push(i+1);
    }
    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number=>(
                    <li><button  onClick={()=>paginado(number)} key={number} >{number}</button></li>
                ))}
            </ul>
        </nav>
    )
};