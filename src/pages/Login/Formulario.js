import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import productosData from './json/example.json';

function Formulario() {
  const [ccVendedor, setCcVendedor] = useState('');
  const [ccComprador, setCcComprador] = useState('');
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [productos, setProductos] = useState([]);
  const [sumaProductos, setSumaProductos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [puntosTotales, setPuntosTotales] = useState(0);
  const [facturaId, setIdFactura] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  


  const handleCcVendedorChange = (event) => {
    setCcVendedor(event.target.value);
  };

  const handleCcCompradorChange = (event) => {
    setCcComprador(event.target.value);
  };

  const handleCantidadProductosChange = (event) => {
    const newCantidadProductos = parseInt(event.target.value);
    setCantidadProductos(newCantidadProductos);
    setProductos((prevProductos) => {
      const newProductos = [...prevProductos];
      if (newProductos.length < newCantidadProductos) {
        // Agrega nuevos elementos a la lista de productos
        for (let i = newProductos.length; i < newCantidadProductos; i++) {
          newProductos.push({ nombre: '', cantidad: 0 });
        }
      } else if (newProductos.length > newCantidadProductos) {
        // Elimina elementos de la lista de productos
        newProductos.splice(newCantidadProductos);
      }
      return newProductos;
    });
  };

  const handleProductoChange = (index, field, value) => {
    const newProductos = [...productos];
    newProductos[index][field] = value;
    setProductos(newProductos);
  
    // Calcular la suma total de todos los productos
    const suma = newProductos.reduce((total, producto) => {
      return total + producto.cantidad;
    }, 0);
    setSumaProductos(suma);
  };
  function guardarDatosEnJson(datos) {
    const jsonString = JSON.stringify(datos);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `factura-${datos.facturaId}.json`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

  const handleSubmit = (event) => {
    event.preventDefault();
    // Generar un ID único para la factura
    const facturaId = uuidv4();
    setIdFactura(facturaId);
  
    // Calcular el valor total de la compra
    let valorTotal = 0;
    let puntosTotales = 0;
    productos.forEach((producto) => {
      const infoProducto = productosData.message.find(
        (p) => p.nombre === producto.nombre
      );
      if (infoProducto) {
        const valorProducto = infoProducto.precio * producto.cantidad;
        const impuestoProducto = valorProducto * 0.19;
        valorTotal += valorProducto + impuestoProducto;
        puntosTotales += Math.floor(valorProducto / 1000);
      }
    });
    setValorTotal(valorTotal);
    setPuntosTotales(puntosTotales);
  
    // hacer algo con los datos capturados, por ejemplo enviarlos al servidor
    // Guardar los datos en localStorage
    const datos = {
        facturaId,
        ccVendedor,
        ccComprador,
        productos,
        sumaProductos,
        valorTotal,
        puntosTotales
    };
    localStorage.setItem('datosCompra', JSON.stringify(datos));
    guardarDatosEnJson(datos);
  };

  const verificarCantidadProducto = (nombreProducto, cantidadDeseada) => {
    const producto = productosData.message.find((p) => p.nombre === nombreProducto);
    return producto ? producto.unidades_disponibles >= cantidadDeseada : false;
  };
  function reiniciarFormulario() {
    setCcVendedor('');
    setCcComprador('');
    setCantidadProductos(0);
    setProductos([]);
    setSumaProductos(0);
    setValorTotal(0);
    setPuntosTotales(0);
    setIdFactura(0);
  }

  /*
        function cargarDatosGuardados() {
        const datos = JSON.parse(localStorage.getItem('datosCompra'));
            if (datos) {
                setCcVendedor(datos.ccVendedor);
                setCcComprador(datos.ccComprador);
                setCantidadProductos(datos.productos.length);
                setProductos(datos.productos);
                setSumaProductos(datos.sumaProductos);
                setValorTotal(datos.valorTotal);
                setPuntosTotales(datos.puntosTotales);
                setIdFactura(datos.facturaId);
            }
        }
        // Llamar la función de cargar los datos guardados cuando se monta el componente
        useEffect(() => {
        cargarDatosGuardados();
        }, []);
  */

  const renderProductoFields = () => {
    const fields = [];
    for (let i = 0; i < cantidadProductos; i++) {
      fields.push(
        <div key={i}>
          <input
            type="text"
            value={productos[i]?.nombre || ''}
            onChange={(event) =>
              handleProductoChange(i, 'nombre', event.target.value)
            }
            placeholder={`Nombre del producto ${i + 1}`}
          />
          <input
            type="number"
            value={productos[i]?.cantidad || ''}
            onChange={(event) =>
              handleProductoChange(i, 'cantidad', parseInt(event.target.value))
            }
            placeholder={`Cantidad del producto ${i + 1}`}
          />
          {productos[i]?.nombre &&
            !verificarCantidadProducto(productos[i].nombre, productos[i].cantidad) && (
              <div style={{ color: 'red' }}>
                No hay suficiente cantidad de {productos[i].nombre} disponible
              </div>
            )}
        </div>
      );
    }
    return fields;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cc-vendedor">CC del vendedor:</label>
        <input type="text" id="cc-vendedor" value={ccVendedor} onChange={handleCcVendedorChange} />
      </div>
      <div>
        <label htmlFor="cc-comprador">CC del comprador:</label>
        <input type="text" id="cc-comprador" value={ccComprador} onChange={handleCcCompradorChange} />
      </div>
      <div>
        <label htmlFor="cantidad-productos">Cantidad de productos:</label>
        <input type="number" id="cantidad-productos" value={cantidadProductos} onChange={handleCantidadProductosChange} />
      </div>
      <div>
        <label>Productos:</label>
        {renderProductoFields()}
        <div>ID FACTURA: {facturaId}</div>
        <div>Suma total de productos: {sumaProductos}</div>
        <div>Valor total de la compra: {valorTotal}</div>
        <div>Valor total de puntos ganados: {puntosTotales}</div>
        
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;