import { useState } from 'react';
import { PRODUCTOS } from './data/product'; // <-- Corregido a singular
import './index.css'; // <-- Asegurate de que este sea el que tiene tus estilos de panadería
// Configuración de tu número de WhatsApp real (Gonzalo Daniel Aguilar)
const NUMERO_WHATSAPP = "5492657611391";

export default function App() {
// Buscá esto arriba de todo en tu App.jsx y reemplazalo:
const [pedido, setPedido] = useState({
  pan: 0,
  facturas: 0,
  bizcochitos: 0,
  rasquetas: 0,
  corderito: 0, // <-- Cambiado de 'cremonas' a 'corderito' para que coincida con el ID
  tostadas: 0
});
  // Estado para los datos del formulario de entrega
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    direccion: '',
    pago: 'Efectivo'
  });

  // Manejadores para aumentar y disminuir cantidades
  const incrementar = (id) => {
    setPedido(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementar = (id) => {
    setPedido(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  // Manejador para los cambios en los inputs del cliente
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDatosEnvio(prev => ({ ...prev, [id]: value }));
  };

  // Cálculo del total general en tiempo real
  const calcularTotal = () => {
    return PRODUCTOS.reduce((acumulado, prod) => {
      return acumulado + (pedido[prod.id] * prod.precio);
    }, 0);
  };

  // Procesamiento del formulario y redirección a WhatsApp
  const enviarPedido = (e) => {
    e.preventDefault();
    const total = calcularTotal();

    if (total === 0) {
      alert("Por favor, sumá al menos un producto a tu pedido.");
      return;
    }

    // Construcción del mensaje de texto formateado
    let mensaje = `🛒 *¡Nuevo Pedido de Preventa!*\n\n`;
    mensaje += `*Cliente:* ${datosEnvio.nombre}\n`;
    mensaje += `*Dirección:* ${datosEnvio.direccion}\n\n`;
    mensaje += `*Detalle del Pedido:*\n`;

    PRODUCTOS.forEach(prod => {
      const cantidad = pedido[prod.id];
      if (cantidad > 0) {
        mensaje += `• ${cantidad}x ${prod.nombre} ($${(cantidad * prod.precio).toLocaleString('es-AR')})\n`;
      }
    });

    mensaje += `\n*Total a Abonar:* $${total.toLocaleString('es-AR')}\n`;
    mensaje += `*Método de Pago:* ${datosEnvio.pago}\n\n`;
    mensaje += `_Quedo a la espera de la confirmación del reparto para mañana._`;

    // Generar link final de la API de WhatsApp
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <>
      <header>
        <h1>🥖 Panadería Familiar</h1>
        <p className="tagline">Hacé tu pedido hoy hasta las 20:00 hs y recibilo mañana fresco en tu puerta.</p>
      </header>

      <main className="container">
        {/* SECCIÓN CATÁLOGO */}
        <section className="catalogo">
          <h2>Nuestro Catálogo</h2>
          
          {PRODUCTOS.map(producto => (
            <div className="producto-card" key={producto.id}>
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p className="precio">${producto.precio.toLocaleString('es-AR')} / {producto.unidad}</p>
              </div>
              <div className="contador">
                <button type="button" className="btn-menos" onClick={() => decrementar(producto.id)}>-</button>
                <span className="cantidad">{pedido[producto.id]}</span>
                <button type="button" className="btn-mas" onClick={() => incrementar(producto.id)}>+</button>
              </div>
            </div>
          ))}
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