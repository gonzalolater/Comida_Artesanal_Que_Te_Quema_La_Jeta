# 🥖 Sistema de Preventa Activa - Panadería Familiar

> **Arquitectura React + Vite + Netlify**. Sistema ultra-ligero y optimizado para dispositivos móviles, diseñado para la captura de pedidos en tiempo real, cálculo automatizado de márgenes comerciales y consolidación de logística de reparto diaria mediante integración nativa con la API de WhatsApp.

Este proyecto fue desarrollado bajo una filosofía de **código puro, modular y de alto rendimiento**, eliminando dependencias innecesarias para garantizar tiempos de carga instantáneos en entornos de conectividad móvil (4G/3G) y asegurar una experiencia de usuario fluida para el cliente final.

---

## 🚀 Características Principales

* **⚡ Arquitectura React Reactiva:** Estado centralizado indexado por ID de producto, garantizando actualizaciones del DOM eficientes y en tiempo real durante la selección del catálogo.
* **📈 Motor de Comisiones Dinámico:** Variable centralizada de margen de ganancia (`PORCENTAJE_COMISION`) que recalcula de forma transparente los precios base de fábrica antes de la renderización del componente, protegiendo el secreto comercial del costo base.
* **📱 Diseño "Mobile-First" Extremo:** Interfaz de usuario estilizada nativamente con CSS fluido, adaptada para su uso en la calle y por el pulgar del usuario, simulando el comportamiento de una Progressive Web App (PWA).
* **📡 Canalización de Datos a WhatsApp:** Serialización automática de la orden de compra en texto enriquecido formateado (Markdown de WhatsApp) y codificación URI segura para el traspaso de la hoja de ruta directo al despachante.
* **🔄 Pipeline CI/CD Automatizado:** Configuración nativa para despliegue e integración continua (Git-driven) mediante Netlify Edge Network.

---

## 📁 Estructura del Repositorio

La arquitectura del proyecto sigue un ordenamiento modular limpio:

```text
PANADERIA_ARTESANAL_FAMILIAR_DIOS_SIEMPRE_ESTA_CON_NOSOTROS/
├── src/
│   ├── data/
│   │   └── product.js     # Fuente de verdad única del catálogo (Precios Base)
│   ├── App.jsx            # Componente núcleo de lógica, hooks de estado y renderizado
│   ├── main.jsx           # Punto de entrada y montaje de React 18+ en el DOM
│   ├── index.css          # Estilos globales y tokens de diseño (colores cálidos)
│   └── App.css            # Estilos específicos del componente
├── index.html             # Esqueleto HTML5 optimizado para Vite
├── netlify.toml           # Configuración de producción para desvíos de SPA (Single Page App)
├── package.json           # Declaración de scripts y dependencias del motor
└── vite.config.js         # Configuración del empaquetador Vite

🛠️ Configuración e Instalación Local
Para levantar el entorno de desarrollo y realizar pruebas de integración:

Clonar el repositorio:

Bash
git clone [https://github.com/tu-usuario/Panaderia_artesanal_familiar_dios_siempre_esta_con_nosotros.git](https://github.com/tu-usuario/Panaderia_artesanal_familiar_dios_siempre_esta_con_nosotros.git)
cd Panaderia_artesanal_familiar_dios_siempre_esta_con_nosotros
Instalar dependencias del árbol de Node:

Bash
npm install
Iniciar el servidor local en modo HMR (Hot Module Replacement):

Bash
npm run dev
La aplicación estará disponible para desarrollo en la ruta local: http://localhost:5173/

⚙️ Variables de Entorno y Configuración de Negocio
La lógica comercial se administra desde el archivo central src/App.jsx. No se requiere Base de Datos externa, agilizando los tiempos de respuesta.

JavaScript
// Localización: src/App.jsx

// 📞 Número de WhatsApp internacional del despachante (Formato estricto: sin +, sin espacios)
const NUMERO_WHATSAPP = "5492657611391"; 

// 📈 Porcentaje de recargo sobre el precio de fábrica (Ej: 25 para un 25% de margen limpio)
const PORCENTAJE_COMISION = 25; 
Matriz del Catálogo Dulce Primario (src/data/product.js):
El catálogo está optimizado para productos de pastelería y panificación industrial de alto margen de ganancia:

JavaScript
export const PRODUCTOS = [
    { id: "facturas", nombre: "Facturas Surtidas", unidad: "docena", precioBase: 8000 },
    { id: "rasquetas", nombre: "Rasquetas", unidad: "unidad", precioBase: 700 },
    { id: "corderito", nombre: "Corderito", unidad: "unidad", precioBase: 700 },
    { id: "masas_finas", nombre: "Masas Finas Surtidas", unidad: "medio kilo", precioBase: 12000 },
    { id: "alfajores_maicena", nombre: "Alfajores de Maicena", unidad: "unidad", precioBase: 600 }
];
🌐 Despliegue en Producción (Netlify Edge)
El proyecto incluye soporte nativo para despliegue automatizado mediante el orquestador de compilación definido en netlify.toml:

Ini, TOML
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
Cada git push origin main desencadena un webhook automático en Netlify que compila el código fuente y distribuye el bundle estático optimizado (dist/) globalmente en cuestión de segundos, sin tiempos de inactividad para los clientes del barrio.

📐 Decisiones de Ingeniería de Software
Inmutabilidad del Estado: Se utiliza el patrón funcional funcional updater setPedido(prev => ({ ...prev, [id]: value })) para asegurar transiciones de estado libres de efectos colaterales e inconsistencias numéricas (NaN).

Formateo Monetario Nativo: Se implementó toLocaleString('es-AR') para renderizar los precios y totales bajo el estándar cultural argentino, mejorando la legibilidad.

Optimización SEO/Semántica: Marcado HTML5 puro (<header>, <main>, <section>) para un correcto parseo y accesibilidad desde cualquier navegador móvil moderno.

Desarrollado con precisión y excelencia técnica por Gonzalo Daniel Aguilar.
