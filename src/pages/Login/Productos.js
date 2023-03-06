import React from "react";

function Productos(props) {
  return (
    <div className="container mt-5" align="center">
      <h4>Lista de Productos</h4>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Stock</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {props.productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.unidades_disponibles}</td>
                  <td>{producto.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Productos;