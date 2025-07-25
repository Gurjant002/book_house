# 🎨 Guía de Colores - G-Books

Esta guía te ayudará a usar correctamente la paleta de colores personalizada de la aplicación G-Books.

## 🎯 Paleta de Colores

```css
--cus-dark: #1E2923;           /* Verde oscuro profundo */
--cus-purpule: #8d52cc;        /* Púrpura vibrante */
--cus-dark-blue: #1C1DE6;      /* Azul eléctrico */
--cus-light-blue: #0195E6;     /* Azul cielo */
--cus-light-blue-2: #5AB5FF;   /* Azul claro */
```

## 📋 Clases CSS Disponibles

### Fondos:
- `.cus-dark-bg` - Fondo verde oscuro
- `.cus-purpule-bg` - Fondo púrpura
- `.cus-dark-blue-bg` - Fondo azul eléctrico
- `.cus-light-blue-bg` - Fondo azul cielo
- `.cus-light-blue-2-bg` - Fondo azul claro

### Textos:
- `.cus-dark-text` - Texto verde oscuro
- `.cus-purpule-text` - Texto púrpura
- `.cus-dark-blue-text` - Texto azul eléctrico
- `.cus-light-blue-text` - Texto azul cielo
- `.cus-light-blue-2-text` - Texto azul claro

## 🏗️ Jerarquía de Uso

### 1. **Headers y Navegación**
```html
<!-- Usar verde oscuro para headers principales -->
<header class="cus-dark-bg text-white">
  <h1>G-BOOKS</h1>
</header>
```

### 2. **Botones Principales (CTA)**
```html
<!-- Púrpura para acciones importantes -->
<button class="cus-purpule-bg text-white">
  Login
</button>
```

### 3. **Botones Secundarios**
```html
<!-- Azul cielo para acciones secundarias -->
<button class="cus-light-blue-bg text-white">
  Add Book
</button>
```

### 4. **Botones de Información**
```html
<!-- Azul claro para acciones menos importantes -->
<button class="cus-light-blue-2-bg text-white">
  View Details
</button>
```

### 5. **Texto Destacado**
```html
<!-- Púrpura para títulos importantes -->
<h2 class="cus-purpule-text">Título Destacado</h2>

<!-- Azul para enlaces -->
<a href="#" class="cus-light-blue-text">Enlace</a>
```

## 🎨 Combinaciones Recomendadas

### **Para Headers/Navbar:**
- **Fondo:** `cus-dark-bg` (verde oscuro)
- **Texto:** `text-white`
- **Botones:** `cus-purpule-bg` o `cus-light-blue-bg`

### **Para Cards/Contenido:**
- **Fondo:** `bg-white` o `bg-gray-50`
- **Títulos:** `cus-purpule-text`
- **Texto normal:** `text-gray-700` o `text-gray-900`
- **Botones:** `cus-light-blue-bg`

### **Para Formularios:**
- **Fondo:** `bg-white`
- **Labels:** `cus-dark-text`
- **Botón enviar:** `cus-purpule-bg`
- **Botón cancelar:** `cus-light-blue-2-bg`

## ✅ Buenas Prácticas

### **DO (Hacer):**
- ✅ Verde oscuro para headers y navegación
- ✅ Púrpura para botones principales y títulos importantes
- ✅ Azul cielo para botones secundarios y enlaces
- ✅ Azul claro para información secundaria
- ✅ Siempre usar texto blanco sobre fondos oscuros
- ✅ Usar fondos blancos/grises claros para contenido principal

### **DON'T (No hacer):**
- ❌ Verde oscuro + púrpura juntos (muy contrastante)
- ❌ Azul eléctrico + azul claro (confuso)
- ❌ Colores vibrantes para texto largo
- ❌ Texto oscuro sobre fondos oscuros
- ❌ Más de 3 colores en un mismo componente

## 🔧 Ejemplos Prácticos

### **Header con botones:**
```html
<header class="cus-dark-bg text-white p-4">
  <h1 class="text-2xl font-bold">G-BOOKS</h1>
  <div class="flex gap-2">
    <button class="cus-purpule-bg text-white px-4 py-2 rounded">
      Login
    </button>
    <button class="cus-light-blue-bg text-white px-4 py-2 rounded">
      Register
    </button>
  </div>
</header>
```

### **Card de libro:**
```html
<div class="bg-white p-6 rounded-lg shadow-lg">
  <h3 class="cus-purpule-text text-xl font-bold mb-2">
    Título del Libro
  </h3>
  <p class="text-gray-700 mb-4">
    Descripción del libro...
  </p>
  <div class="flex gap-2">
    <button class="cus-light-blue-bg text-white px-3 py-1 rounded">
      Ver Detalles
    </button>
    <button class="cus-light-blue-2-bg text-white px-3 py-1 rounded">
      Reservar
    </button>
  </div>
</div>
```

### **Formulario:**
```html
<form class="bg-white p-6 rounded-lg">
  <h2 class="cus-dark-text text-2xl font-bold mb-4">
    Agregar Libro
  </h2>
  
  <label class="cus-dark-text font-medium">
    Título:
  </label>
  <input class="border border-gray-300 rounded p-2 w-full mb-4">
  
  <div class="flex gap-2">
    <button class="cus-purpule-bg text-white px-4 py-2 rounded">
      Guardar
    </button>
    <button class="cus-light-blue-2-bg text-white px-4 py-2 rounded">
      Cancelar
    </button>
  </div>
</form>
```

## 🌈 Paleta de Grises Complementaria

Para usar junto con tus colores principales:
- `text-white` - Texto blanco
- `text-gray-900` - Texto muy oscuro
- `text-gray-700` - Texto gris oscuro
- `text-gray-500` - Texto gris medio
- `text-gray-300` - Texto gris claro
- `bg-gray-50` - Fondo gris muy claro
- `bg-gray-100` - Fondo gris claro

## 🎯 Esquema Recomendado para G-Books

1. **Header/Navbar:** `cus-dark-bg` + `text-white`
2. **Botones principales:** `cus-purpule-bg` + `text-white`
3. **Botones secundarios:** `cus-light-blue-bg` + `text-white`
4. **Enlaces:** `cus-light-blue-text`
5. **Títulos importantes:** `cus-purpule-text`
6. **Texto secundario:** `cus-light-blue-2-text`
7. **Fondos de contenido:** `bg-white` o `bg-gray-50`
8. **Texto normal:** `text-gray-700` o `text-gray-900`

---

**💡 Tip:** Siempre verifica el contraste entre texto y fondo para asegurar la legibilidad. Usa herramientas como WebAIM Contrast Checker si tienes dudas.

**🔄 Última actualización:** Enero 2025
