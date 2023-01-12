import React from "react";
import { Link } from "react-router-dom";

const Navbar =(props)=>{
    return(
        <>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <hr/>
        </ul></>
    )
}

export default Navbar;