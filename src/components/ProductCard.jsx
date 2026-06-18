import React from 'react'

export default function ProductCard({ producto, cantidad, onIncrement, onDecrement }) {
  return (
    <div className="producto-card" key={producto.id}>
      <img src={`/` + (producto.image || '')} alt={producto.nombre} className="producto-img" />
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="precio">${producto.precioBase.toLocaleString('es-AR')} / {producto.unidad}</p>
      </div>
      <div className="contador">
        <button type="button" className="btn-menos" onClick={() => onDecrement(producto.id)}>-</button>
        <span className="cantidad">{cantidad}</span>
        <button type="button" className="btn-mas" onClick={() => onIncrement(producto.id)}>+</button>
      </div>
    </div>
  )
}
