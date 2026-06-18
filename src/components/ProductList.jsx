import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ productos, pedido, onIncrement, onDecrement }) {
  return (
    <section className="catalogo">
      <h2>Menú</h2>
      {productos.map(prod => (
        <ProductCard
          key={prod.id}
          producto={prod}
          cantidad={pedido[prod.id] || 0}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </section>
  )
}
