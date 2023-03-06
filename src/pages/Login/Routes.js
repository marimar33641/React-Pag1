import React from "react";
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import Login from "./Login";
import Menu from "./Menu";
import Menu2 from "./Menu2";

function Routess(){
    return(
        <Router>
            <Routes>
                <Route exact path="/" component= {Login} />
                <Route exact path="/Menu" component= {Menu} />
                <Route exact path="/Menu2" component= {Menu2} />

            </Routes>
        </Router>

    );
}
export default Routess;