import { useState } from 'react';
import { PRODUCTOS } from './data/product';
import './index.css';

// Configuración de tu número de WhatsApp real (Gonzalo Daniel Aguilar)
const NUMERO_WHATSAPP = "5492657611391"; 

// 📈 CONFIGURACIÓN DE TU COMISIÓN (En porcentaje)
// Si ponés 0, se vende al precio base de fábrica. 
// Si ponés 10, le suma un 10% de ganancia automáticamente a todo el catálogo.
const PORCENTAJE_COMISION = 25; 

export default function App() {
  // Estado para controlar las cantidades (Sin el pan común)
  const [pedido, setPedido] = useState({
    facturas: 0,
    bizcochitos: 0,
    rasquetas: 0,
    corderito: 0,
    tostadas: 0
  });

  // Estado para los datos del formulario de entrega
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    direccion: '',
    pago: 'Efectivo'
  });

  // Función interna para calcular el precio final de un producto con la comisión
  const obtenerPrecioFinal = (precioBase) => {
    return Math.round(precioBase * (1 + PORCENTAJE_COMISION / 100));
  };

  const incrementar = (id) => {
    setPedido(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementar = (id) => {
    setPedido(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDatosEnvio(prev => ({ ...prev, [id]: value }));
  };

  // Cálculo del total general usando el precio final con comisión
  const calcularTotal = () => {
    return PRODUCTOS.reduce((acumulado, prod) => {
      const precioFinal = obtenerPrecioFinal(prod.precioBase);
      return acumulado + (pedido[prod.id] * precioFinal);
    }, 0);
  };

  const enviarPedido = (e) => {
    e.preventDefault();
    const total = calcularTotal();

    if (total === 0) {
      alert("Por favor, sumá al menos un producto a tu pedido.");
      return;
    }

    let mensaje = `🛒 *¡Nuevo Pedido de Preventa!*\n\n`;
    mensaje += `*Cliente:* ${datosEnvio.nombre}\n`;
    mensaje += `*Dirección:* ${datosEnvio.direccion}\n\n`;
    mensaje += `*Detalle del Pedido:*\n`;

    PRODUCTOS.forEach(prod => {
      const cantidad = pedido[prod.id];
      if (cantidad > 0) {
        const precioFinal = obtenerPrecioFinal(prod.precioBase);
        mensaje += `• ${cantidad}x ${prod.nombre} ($${(cantidad * precioFinal).toLocaleString('es-AR')})\n`;
      }
    });

    mensaje += `\n*Total a Abonar:* $${total.toLocaleString('es-AR')}\n`;
    mensaje += `*Método de Pago:* ${datosEnvio.pago}\n\n`;
    mensaje += `_Quedo a la espera de la confirmación del reparto para mañana._`;

    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <>
      <header>
        <h1>🥖 Panadería Familiar</h1>
        <p className="tagline">Hacé tu pedido de cosas dulces hoy hasta las 20:00 hs y recibilo mañana fresco en tu puerta.</p>
      </header>

      <main className="container">
        {/* SECCIÓN CATÁLOGO */}
        <section className="catalogo">
          <h2>Especialidades Dulces y Saladas</h2>
          
          {PRODUCTOS.map(producto => {
            const precioFinal = obtenerPrecioFinal(producto.precioBase);
            return (
              <div className="producto-card" key={producto.id}>
                <div className="producto-info">
                  <h3>{producto.nombre}</h3>
                  <p className="precio">${precioFinal.toLocaleString('es-AR')} / {producto.unidad}</p>
                </div>
                <div className="contador">
                  <button type="button" className="btn-menos" onClick={() => decrementar(producto.id)}>-</button>
                  <span className="cantidad">{pedido[producto.id]}</span>
                  <button type="button" className="btn-mas" onClick={() => incrementar(producto.id)}>+</button>
                </div>
              </div>
            );
          })}
        </section>

        {/* SECCIÓN FORMULARIO */}
        <section className="checkout-seccion">
          <h2>Datos de Entrega</h2>
          <form onSubmit={enviarPedido}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre y Apellido</label>
              <input 
                type="text" 
                id="nombre" 
                required 
                placeholder="Ej: Juan Pérez" 
                value={datosEnvio.nombre}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="direccion">Dirección / Barrio</label>
              <input 
                type="text" 
                id="direccion" 
                required 
                placeholder="Ej: Calle Falsa 123" 
                value={datosEnvio.direccion}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="pago">Método de Pago</label>
              <select id="pago" value={datosEnvio.pago} onChange={handleInputChange} required>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia / Mercado Pago</option>
              </select>
            </div>

            <div className="resumen-total">
              <span>Total a abonar:</span>
              <strong>${calcularTotal().toLocaleString('es-AR')}</strong>
            </div>

            <button type="submit" className="btn-enviar">
              🚀 Confirmar Pedido por WhatsApp
            </button>
          </form>
        </section>
      </main>
    </>
  );
}