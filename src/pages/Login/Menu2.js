import React, { useEffect, useState, Component } from "react";
import './Menu2.css'
import Formulario from "./Formulario";
class Menu extends Component{
    render(){
        return(
            <div className='Menu2-container'>
                <h1>
                    Vendedor
                    <Formulario></Formulario>
                </h1>
            </div>
        );
    }

}
export default Menu;