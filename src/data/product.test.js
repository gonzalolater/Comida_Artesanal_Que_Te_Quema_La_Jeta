import { describe, it, expect } from 'vitest'
import { PRODUCTOS } from './product.js'

describe('PRODUCTOS data', () => {
  it('es un arreglo no vacío', () => {
    expect(Array.isArray(PRODUCTOS)).toBe(true)
    expect(PRODUCTOS.length).toBeGreaterThan(0)
  })

  it('cada producto tiene las propiedades requeridas', () => {
    for (const p of PRODUCTOS) {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('nombre')
      expect(p).toHaveProperty('unidad')
      expect(p).toHaveProperty('precioBase')
    }
  })

  it('los ids son únicos', () => {
    const ids = PRODUCTOS.map(p => p.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('los precios base son números positivos', () => {
    for (const p of PRODUCTOS) {
      expect(typeof p.precioBase).toBe('number')
      expect(p.precioBase).toBeGreaterThan(0)
    }
  })

  it('verifica precios esperados para productos clave', () => {
    const findById = id => PRODUCTOS.find(p => p.id === id)
    expect(findById('hamburguesa_comun').precioBase).toBe(5000)
    expect(findById('hamburguesa_completa').precioBase).toBe(7000)
  })
})
