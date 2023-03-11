import React, { useState } from "react";

function ActualizarFormulario() {
  const [idFactura, setIdFactura] = useState("");
  const [factura, setFactura] = useState({});

  const handleInputChange = (event) => {
    setIdFactura(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/facturas/${idFactura}`);
    const facturaData = await response.json();
    setFactura(facturaData);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/facturas/${idFactura}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(factura),
    });
    const updatedFactura = await response.json();
    console.log(updatedFactura);
    setIdFactura("");
    setFactura({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ID de la factura:
          <input type="text" value={idFactura} onChange={handleInputChange} />
        </label>
        <button type="submit">Buscar Factura</button>
      </form>

      {factura.id && (
        <form onSubmit={handleUpdate}>
          <label>
            Cliente:
            <input
              type="text"
              value={factura.cliente}
              onChange={(event) =>
                setFactura({ ...factura, cliente: event.target.value })
              }
            />
          </label>
          <label>
            Producto:
            <input
              type="text"
              value={factura.producto}
              onChange={(event) =>
                setFactura({ ...factura, producto: event.target.value })
              }
            />
          </label>
          <label>
            Cantidad:
            <input
              type="text"
              value={factura.cantidad}
              onChange={(event) =>
                setFactura({ ...factura, cantidad: event.target.value })
              }
            />
          </label>
          <label>
            Precio Unitario:
            <input
              type="text"
              value={factura.precioUnitario}
              onChange={(event) =>
                setFactura({ ...factura, precioUnitario: event.target.value })
              }
            />
          </label>
          <button type="submit">Actualizar Factura</button>
        </form>
      )}
    </div>
  );
}

export default ActualizarFormulario;