import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"

const LandingPage = ()=>{
    return(
        <div className={style.container}>
            <section className={style.section}>
                <h1 className={style.welcome}>WELCOME</h1>           
                <Link className={style.button} to="/home">Go to Home</Link>
                <span>Created by: <b>Adrian Frias</b></span>
            </section>
        </div>
    )
};

export default LandingPage; 