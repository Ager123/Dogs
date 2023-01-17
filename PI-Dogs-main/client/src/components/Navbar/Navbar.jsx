import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css"

const Navbar =()=>{
    return(
        <div className={style.container}>
            <Link to="/" className={style.link01}>LANDING PAGE</Link>
            <Link to="/dogs/create" className={style.link01}>ADD NEW BREED</Link>
            <Link to="/about" className={style.link01}>ABOUT</Link>
        </div>
    )
}

export default Navbar;