import { useState } from 'react';
import { PRODUCTOS } from './data/product';
import './index.css';
import ProductList from './components/ProductList'

// Configuración de tu número de WhatsApp real (Gonzalo Daniel Aguilar)
const NUMERO_WHATSAPP = "5492657611391"; 

// 📈 CONFIGURACIÓN DE TU COMISIÓN (En porcentaje)
// Si ponés 0, se vende al precio base de fábrica.
// Se vende al precio base actual de los productos.
const PORCENTAJE_COMISION = 0;

// Datos de pago por Mercado Pago
const MP_ALIAS = 'adapte.ancla.alfa.mp'
const MP_CVU = '0000003100064510554811'
export default function App() {
  const initialPedido = PRODUCTOS.reduce((acc, p) => {
    acc[p.id] = 0;
    return acc;
  }, {});

  const [pedido, setPedido] = useState(initialPedido);
  // Estado para los datos del cliente
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    telefono: '',
    pago: 'Mercado Pago'
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

  const copiarTexto = async (texto, etiqueta) => {
    try {
      await navigator.clipboard.writeText(texto);
      alert(`${etiqueta} copiado al portapapeles`);
    } catch (error) {
      alert(`No se pudo copiar ${etiqueta}. Intenta manualmente.`);
    }
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

    let mensaje = `🛒 *¡Nuevo Pedido de Comida Artesanal!*\n\n`;
    mensaje += `*Cliente:* ${datosEnvio.nombre}\n`;
    mensaje += `*Teléfono:* ${datosEnvio.telefono}\n\n`;
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
      mensaje += `*Instrucciones de Pago (Mercado Pago):*\n`;
      mensaje += `• Alias: ${MP_ALIAS}\n`;
      mensaje += `• CVU: ${MP_CVU}\n\n`;
    mensaje += `*ATENCIÓN:* Si la orden no está acompañada por el comprobante de transferencia, no será tomada en cuenta.\n\n`;
    mensaje += `_Por favor, enviá el comprobante de pago al mismo número o adjuntalo en la conversación de WhatsApp._\n\n`;
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <>
      <header>
        <h1>🍔 Comida Casera Artesanal</h1>
        <p className="tagline">Pedí hamburguesas artesanales para llevar — frescas y hechas en casa.</p>
      </header>

      <main className="container">
        {/* SECCIÓN CATÁLOGO */}
        <section className="catalogo">
          <h2>Especialidades Dulces y Saladas</h2>
          
          <ProductList
            productos={PRODUCTOS.map(p => ({ ...p, precioBase: obtenerPrecioFinal(p.precioBase) }))}
            pedido={pedido}
            onIncrement={incrementar}
            onDecrement={decrementar}
          />
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
              <label htmlFor="telefono">Número de Cliente</label>
              <input 
                type="text" 
                id="telefono" 
                required 
                placeholder="0000" 
                value={datosEnvio.telefono}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="pago">Método de Pago</label>
              <select id="pago" value={datosEnvio.pago} onChange={handleInputChange} required>
                <option value="Mercado Pago">Mercado Pago</option>
                <option value="Transferencia bancaria">Transferencia bancaria</option>
              </select>
            </div>

            <div className="resumen-total">
              <span>Total a abonar:</span>
              <strong>${calcularTotal().toLocaleString('es-AR')}</strong>
            </div>

            <div className="pago-aviso">
              <p><strong>Pago por Mercado Pago</strong></p>
              <div className="dato-copiable">
                <span>Alias: <strong>{MP_ALIAS}</strong></span>
                <button type="button" className="btn-copiar" onClick={() => copiarTexto(MP_ALIAS, 'Alias')}>
                  Copiar
                </button>
              </div>
              <div className="dato-copiable">
                <span>CVU: <strong>{MP_CVU}</strong></span>
                <button type="button" className="btn-copiar" onClick={() => copiarTexto(MP_CVU, 'CVU')}>
                  Copiar
                </button>
              </div>
              <div className="dato-copiable">
                <span>Nombre de referencia: <strong>Gonzalo Daniel Aguilar</strong></span>
              </div>
              <p className="pago-importante">Si la orden no está acompañada por el comprobante de transferencia, no será tomada en cuenta.</p>
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