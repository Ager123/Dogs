import React from "react";
import { Link } from "react-router-dom";
import style from "./About.module.css"

const About = (props)=>{
    return(
        <div className={style.all}>
            <section className={style.topSection}>
                <Link to="/home" ><button className={style.button}>BACK TO HOME</button></Link>
            </section>
            <section className={style.container}>
                <h1>DOGS APP</h1>
                <h3>Proyecto Individual de Soy Henry</h3>
                <h6>Autor: Adrian Esteban Frias</h6>
                <h6>Cohorte FT32-b</h6>
                <p>Este Proyecto tiene como Objetivos</p>
                <ol>
                    <li>Construir una App utlizando React, Redux, Node y Sequelize.</li>
                    <li>Afirmar y conectar los conceptos aprendidos en la carrera.</li>
                    <li>Aprender mejores prácticas.</li>
                    <li>Aprender y practicar el workflow de GIT.</li>
                    <li>Usar y practicar testing.</li>
                </ol>
            </section>
        </div>
    )
};

export default About;   