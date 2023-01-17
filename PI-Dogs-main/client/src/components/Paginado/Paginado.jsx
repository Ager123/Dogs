import React from "react";
import style from "./Paginado.module.css"

export default function Paginado ({dogsXPage,totalDogs,paginado,currentPage} ){
    const pageNumbers=[];
    for(let i=0;i<Math.ceil(totalDogs/dogsXPage);i++){
        pageNumbers.push(i+1);
    }
    return(
        <nav>
            <div>
                {currentPage>1 && (<button onClick={()=>paginado(1)} key="first" className={style.commonNumber}>{"<<"}</button>)}
                {currentPage>1 && (<button onClick={()=>paginado(currentPage-1)} key="previous" className={style.commonNumber}>{"<"}</button>)}
                {pageNumbers && pageNumbers.map(number=>(
                    <button  onClick={()=>paginado(number)} key={number} className={(currentPage==number)? style.currentNumber : style.commonNumber } >{number}</button>
                    ))}
                {currentPage<(pageNumbers.length) && (<button onClick={()=>paginado(currentPage+1)} key="next" className={style.commonNumber} >{">"}</button>)}
                {currentPage<(pageNumbers.length) && (<button onClick={()=>paginado(pageNumbers.length)} key="last" className={style.commonNumber}>{">>"}</button>)}
            </div>
        </nav>
    )
};