# 🍔 Comida Casera Artesanal — Aplicación de Venta

![CI](https://github.com/gonzalolater/Comida_Artesanal_Que_Te_Quema_La_Jeta/actions/workflows/ci.yml/badge.svg)

Aplicación ligera desarrollada con React + Vite para gestionar y vender comida casera artesanal localmente. Este repositorio contiene la interfaz cliente, catálogo de productos y utilidades para serializar pedidos (ej. envío por WhatsApp).

Resumen rápido:
- Propósito: Vender comida casera artesanal en línea y registrar pedidos.
- Stack: React, Vite, Vitest (pruebas unitarias).

## Productos actuales
La tienda por ahora ofrece únicamente dos productos:

- **Hamburguesa artesanal — Común**: $5.000
- **Hamburguesa artesanal — Completa**: $7.000

Los precios están expresados en pesos argentinos (AR$) y el catálogo fuente está en `src/data/product.js`.

## Cómo ejecutar en desarrollo

1. Instalar dependencias:

```bash
npm install
```

2. Levantar el servidor de desarrollo (HMR):

```bash
npm run dev
```

3. Abrir en el navegador: http://localhost:5173/

## Ejecutar pruebas unitarias

Se usa `vitest` para las pruebas. Ejecutar:

```bash
npm test
```

Las pruebas se ejecutan localmente y también en el CI configurado en `.github/workflows/ci.yml`.

## Deploy

El repositorio está preparado para despliegues estáticos (por ejemplo Netlify o Vercel). El comando de build es:

```bash
npm run build
```

Publicar la carpeta `dist/` en el proveedor de hosting estático que elijas.

## Notas para desarrollo

- Si vas a cambiar el catálogo, edita `src/data/product.js` y luego actualiza/añade pruebas en `src/data/product.test.js` para mantener la coherencia.
- Si quieres que actualice el catálogo con tus dos productos o que agregue pruebas e integración para el nuevo flujo de ventas, dime y lo hago.

## Pago y comprobante

- Método preferido: Mercado Pago (transferencia / pago con alias)
- Alias: adapte.ancla.alfa.mp
- CVU: 0000003100064510554811

Por favor, enviá el comprobante de pago por la misma conversación de WhatsApp tras confirmar el pedido.

---

Desarrollado por Gonzalo Daniel Aguilar.
