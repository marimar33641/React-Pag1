import React, { Component } from "react";
import Productos from "./Productos";
import "./Menu2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import productos from "./json/example.json";

class Menu extends Component {
    state={
        busqueda: '',
        campeones: [],
        columnas:[]
    }
    
    onChange=async e=>{
        e.persist();
        await this.setState({busqueda: e.target.value});
        console.log(this.state.busqueda);
    }
    componentDidMount() {
        // Agregar los datos de los productos al estado del componente
        this.setState({ campeones: productos });
    
        // Definir las columnas que se mostrarán en la tabla
        const columnas = [
            {
                name: 'Nombre',
                selector: 'nombre',
                sortable: true,
            },
            {
                name: 'Precio',
                selector: 'precio',
                sortable: true,
            },
            {
                name: 'Descripción',
                selector: 'descripcion',
                sortable: true,
            },
        ];
    
        this.setState({ columnas });
      }

    render() {
        return (
        <div className="Menu2-container">
            <div className="barraBusqueda">
            <input
                type="text"
                placeholder="Buscar"
                className="textField"
                name="busqueda"
                value={this.state.busqueda}
                onChange={this.onChange}
            />
            <button type="button" className="btnBuscar">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            </div>
            <h1>Administrador</h1>
            <Productos productos={productos.message} />
        </div>
        );
    }
}

export default Menu;