# 🔒 Política de Seguridad - Comida Artesanal

Este documento detalla las medidas de seguridad, el tratamiento de datos de los usuarios y los protocolos de mitigación de riesgos implementados en la aplicación de comida artesanal.

---

## 🛡️ Filosofía de Seguridad: "Zero-Data Storage"

Para garantizar la máxima privacidad de los clientes y la protección del secreto comercial de la fábrica, la aplicación fue diseñada bajo el principio de **Almacenamiento Cero**:

1. **Sin Base de Datos Centralizada:** La aplicación no almacena nombres, direcciones, números de teléfono ni montos de pedidos en servidores propios ni en la nube. 
2. **Ciclo de Vida de los Datos:** Los datos ingresados por el cliente en el formulario de entrega (`nombre`, `direccion`, `pago`) existen únicamente en la memoria volátil del navegador del usuario (estado reactivo de React). Se destruyen por completo al cerrar o refrescar la pestaña.
3. **Privacidad del Margen Comercial:** El costo base de fábrica configurado en `product.js` y el algoritmo de recargo por comisión se ejecutan del lado del cliente antes de renderizar la UI. No se exponen APIs públicas que puedan ser interceptadas para conocer el margen de ganancia del negocio.

---

## 📡 Canal de Comunicación Seguro (Transporte de Datos)

El traspaso de la orden de compra desde la web hacia el despachante se realiza mediante **Inyección Segura de Parámetros** a la API oficial de WhatsApp:

* **Cifrado en Tránsito:** La transferencia del texto del pedido se realiza utilizando el protocolo criptográfico seguro **HTTPS** hacia los servidores de Meta.
* **Integridad del Mensaje:** La serialización se realiza mediante una codificación URI estricta (`encodeURIComponent`), evitando la alteración o inyección de scripts maliciosos durante el redireccionamiento.
* **Mensajería Extremo a Extremo:** Al abrirse la aplicación de WhatsApp, el mensaje se envía utilizando el cifrado de extremo a extremo nativo de la plataforma de mensajería, garantizando que nadie en el camino pueda leer la dirección o el pedido del vecino.

---

## 🚀 Seguridad en el Despliegue (Netlify Edge)

La infraestructura de hosting provista por Netlify añade las siguientes capas de protección automáticas:

* **Certificado SSL/TLS Automático:** Toda la navegación dentro de la web está protegida por encriptación SSL de alta seguridad (candado verde en el navegador), previniendo ataques de interceptación (*Man-in-the-Middle*).
* **Cabeceras de Redirección Seguras:** El archivo de configuración `netlify.toml` procesa las solicitudes de rutas de forma interna, evitando la exposición de directorios del código fuente al público.

---

## 🐛 Reporte de Vulnerabilidades

Si detectás algún comportamiento inusual en la carga de los contadores, errores de desborde numérico (`NaN`), o fallas en el direccionamiento del enlace de WhatsApp, por favor no abras un *Issue* público en GitHub. 

Comunicate directamente con el Ingeniero de Sistemas a cargo del proyecto para aplicar un parche de inmediato:

* **Desarrollador Líder:** Gonzalo Daniel Aguilar
* **Canal de Reporte:** Vía mensaje directo al canal de soporte técnico configurado en la aplicación.

---
*Comprometidos con la transparencia, la soberanía tecnológica y la seguridad de nuestra comunidad.*
