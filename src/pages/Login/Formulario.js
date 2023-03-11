import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import productosData from './json/example.json';
import './Formulario.css'
function Formulario() {
  const [ccVendedor, setCcVendedor] = useState('');
  const [ccComprador, setCcComprador] = useState('');
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [productos, setProductos] = useState([]);
  const [sumaProductos, setSumaProductos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [puntosTotales, setPuntosTotales] = useState(0);
  const [facturaId, setIdFactura] = useState(0);
  const [productoActual, setProductoActual] = useState({nombre: '', cantidad: 0});
  const [facturas, setFacturas] = useState(JSON.parse(localStorage.getItem('facturas')) || []);
  const [facturaIdBuscar, setFacturaIdBuscar] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [facturaEncontrada, setFacturaEncontrada] = useState(false);



  const verificarCantidadProducto = (nombreProducto, cantidadDeseada) => {
    const producto = productosData.message.find((p) => p.nombre === nombreProducto);
    return producto ? producto.unidades_disponibles >= cantidadDeseada : false;
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'cantidadProductos') {
      // Actualizar la cantidad de productos
      setCantidadProductos(value);
      // Crear un array vacío de productos con la cantidad indicada
      const nuevosProductos = new Array(Number(value)).fill({ nombre: '', valor: 0 });
      // Actualizar el estado de los productos
      setProductos(nuevosProductos);
    } else if (name.startsWith('producto-')) {
      // Actualizar el nombre o el valor de un producto
      const index = Number(name.split('-')[1]);
      const propiedad = name.split('-')[2];
      const nuevosProductos = [...productos];
      nuevosProductos[index][propiedad] = value;
      setProductos(nuevosProductos);
    } else {
      // Actualizar otros campos del formulario
      switch (name) {
        case 'ccVendedor':
          setCcVendedor(value);
          break;
        case 'ccComprador':
          setCcComprador(value);
          break;
        case 'idFactura':
          setIdFactura(value);
          break;
        case 'valorTotal':
          setValorTotal(value);
          break;
        case 'puntosTotales':
          setPuntosTotales(value);
          break;
        default:
          break;
      }
    }
  };

  
  function actualizarFacturaEnLocalStorage(facturaId, nuevosDatos) {
    // Obtener las facturas del localStorage
    const facturas = JSON.parse(localStorage.getItem("facturas")) || [];
  
    // Buscar la factura a actualizar por su ID
    const facturaActualizada = facturas.find((factura) => factura.id === facturaId);
  
    // Si la factura existe, actualizar sus datos y guardarlas en el localStorage
    if (facturaActualizada) {
      facturaActualizada.ccVendedor = nuevosDatos.ccVendedor || facturaActualizada.ccVendedor;
      facturaActualizada.ccComprador = nuevosDatos.ccComprador || facturaActualizada.ccComprador;
      facturaActualizada.cantidadProductos = nuevosDatos.cantidadProductos || facturaActualizada.cantidadProductos;
      facturaActualizada.productos = nuevosDatos.productos || facturaActualizada.productos;
      localStorage.setItem("facturas", JSON.stringify(facturas));
      setFacturas(facturas);
    }
  }


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
    /*a.download = `factura-${datos.facturaId}.json`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);*/
}

const handleReset = () => {
  setCcVendedor('');
  setCcComprador('');
  setSumaProductos(0);
  setValorTotal(0);
  setCantidadProductos(0);
  setPuntosTotales(0);
  setIdFactura('');
  setProductoActual({nombre: '', cantidad: 0});
  if (productos.length > 0) {
    // Si ya hay productos en el estado productos, no sobrescribirlos con un array vacío
    setProductos([]);
  }
};



const handleLoadFactura = (event) => {
  event.preventDefault();
  // Obtener el ID de la factura a cargar
  const facturaId = Number(event.target.elements['idFactura'].value);
  // Obtener las facturas del localStorage
  const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
  // Buscar la factura a actualizar por su ID
  const facturaActualizada = facturas.find((factura) => factura.id === facturaId);
  // Si la factura existe, cargar sus datos en el formulario
  if (facturaActualizada) {
    setCcVendedor(facturaActualizada.ccVendedor);
    setCcComprador(facturaActualizada.ccComprador);
    setCantidadProductos(facturaActualizada.cantidadProductos);
    setProductos(facturaActualizada.productos);
    setIdFactura(facturaId);
    setValorTotal(facturaActualizada.valorTotal);
    setPuntosTotales(facturaActualizada.puntosTotales);
    }
    else {
    alert('No se encontró una factura con el ID ingresado.');
  }
};
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
  setFacturas([...facturas, datos]);
  //localStorage.setItem('datosCompra', JSON.stringify(datos));
  localStorage.setItem('facturas', JSON.stringify([...facturas, datos]));

  guardarDatosEnJson(datos);
  actualizarFacturaEnLocalStorage(datos);
  // Reiniciar el formulario
  handleReset();
};



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

  const buscarFactura = () => {
    const factura = facturas.find((f) => f.facturaId === facturaIdBuscar);
    if (factura) {
      setFacturaSeleccionada(factura);
      setFacturaEncontrada(true);
    } else {
      setFacturaSeleccionada(null);
      setFacturaEncontrada(false);
      alert("Factura no encontrada");
    }
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
      <button className="update-btn" onClick={() => actualizarFacturaEnLocalStorage(facturaId, { handleInputChange  })}>
      Actualizar factura
      </button>
      <label>
      Buscar factura por ID:
      <input
        type="text"
        name="facturaIdBuscar"
        value={facturaIdBuscar}
        onChange={(e) => setFacturaIdBuscar(e.target.value)}
      />
    </label>
    <button className="search-btn" onClick={buscarFactura}>Buscar</button>

    </form>
  );
}

export default Formulario;