import React from "react";
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Menu from "./Menu";
import Menu2 from "./Menu2";
import Login from "./Login";

function Routess(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element= {<Login/>} />
                <Route exact path="/Menu" element= {<Menu/>} />
                <Route exact path="/Menu2" element= {<Menu2/>} />

            </Routes>
        </BrowserRouter>

    );
}
export default Routess;