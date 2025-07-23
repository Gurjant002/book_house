# 📚 G-Books - Documentación del Context de Usuario

## 🎭 ¿Qué es esto y por qué existe?

Esta documentación explica la implementación de React Context para manejar el estado global del usuario en la aplicación G-Books. Porque aparentemente, pasar props entre 47 componentes anidados no era la mejor idea del mundo.

## 🚀 Cambios Implementados

### 1. **UserContext.tsx** - El Cerebro de la Operación
**Ubicación:** `src/context/UserContext.tsx`

Este archivo contiene:
- **UserContext**: El Context que almacena los datos del usuario
- **useUser**: Hook personalizado para acceder al Context
- **UserProvider**: Componente que envuelve la app y proporciona los datos

**¿Qué maneja?**
- ✅ Autenticación del usuario
- ✅ Validación automática de tokens
- ✅ Datos del usuario (username, email, nombre completo)
- ✅ Estados de carga
- ✅ Login/Logout centralizado
- ✅ Redirecciones automáticas

### 2. **Layout.tsx** - El Megáfono
**Cambio:** Se envolvió toda la aplicación con `UserProvider`

```tsx
// Antes: Solo children
{children}

// Después: Children envueltos en Context
<UserProvider>
  {children}
</UserProvider>
```

### 3. **HeaderPanel.tsx** - Simplificación Dramática
**Antes:** 60+ líneas de lógica repetitiva
**Después:** 10 líneas usando Context

**Lo que se eliminó:**
- ❌ Multiple useEffect para validar tokens
- ❌ Estados locales para usuario/token
- ❌ Lógica de validación duplicada
- ❌ Manejo manual de sessionStorage

**Lo que se añadió:**
- ✅ Una línea para acceder a todo: `const { user, isAuthenticated, logout } = useUser()`

### 4. **Login Page** - Login Inteligente
**Cambios principales:**
- Usa `login()` del Context en lugar de manejar sessionStorage manualmente
- Redirecciones automáticas si ya está autenticado
- Manejo de errores simplificado

### 5. **Profile Page** - Protección Automática
**Antes:** Lógica de validación de token y fetch de usuario
**Después:** Los datos están disponibles inmediatamente

## 📝 Cómo Usar el Context

### En cualquier componente:

```tsx
import { useUser } from "@/context/UserContext";

function MiComponente() {
  const { user, isAuthenticated, isLoading, logout } = useUser();
  
  // Mostrar loading
  if (isLoading) return <div>Cargando...</div>;
  
  // Verificar autenticación
  if (!isAuthenticated) return <div>No autenticado</div>;
  
  // Usar datos del usuario
  return (
    <div>
      <h1>¡Hola {user?.username}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

### Propiedades disponibles en `useUser()`:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `user` | `NonSensitiveUser \| null` | Datos del usuario autenticado |
| `tokenData` | `ValidatedToken \| null` | Datos del token validado |
| `isAuthenticated` | `boolean` | Si el usuario está autenticado |
| `isLoading` | `boolean` | Si está cargando datos |
| `login(token)` | `Function` | Función para hacer login |
| `logout()` | `Function` | Función para hacer logout |

## 🔐 Protección de Rutas

### Patrón recomendado para páginas protegidas:

```tsx
function PaginaProtegida() {
  const { isAuthenticated, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <div>Cargando...</div>;
  if (!isAuthenticated) return null;

  return <div>Contenido protegido</div>;
}
```

## 🎯 Ventajas de esta Implementación

### ✅ **DRY (Don't Repeat Yourself)**
Ya no repites la misma lógica de validación en cada componente.

### ✅ **Estado Global Reactivo**
Cuando el usuario se desloguea, TODOS los componentes se actualizan automáticamente.

### ✅ **Menos Props Drilling**
No necesitas pasar datos de usuario de padre a hijo múltiples veces.

### ✅ **Código Más Limpio**
Menos `useEffect`, `useState` y lógica repetitiva.

### ✅ **Manejo Centralizado de Errores**
Si el token expira, se maneja automáticamente en un solo lugar.

### ✅ **Performance Mejorada**
Los datos del usuario se obtienen una sola vez, no en cada componente.

## 🛠 Flujo de Autenticación

### 1. **Inicio de la App**
```
App se carga → UserProvider verifica token en sessionStorage → 
Si existe y es válido: obtiene datos del usuario →
Si no existe o es inválido: usuario no autenticado
```

### 2. **Login**
```
Usuario envía credenciales → API responde con token →
Context guarda token y obtiene datos del usuario →
Redirige a página principal
```

### 3. **Logout**
```
Usuario hace click en logout → Context limpia sessionStorage →
Actualiza estado global → Redirige a login
```

### 4. **Navegación**
```
Usuario navega a página protegida → 
Componente verifica isAuthenticated →
Si no está autenticado: redirige a login
```

## 📁 Estructura de Archivos Modificados

```
src/
├── context/
│   └── UserContext.tsx          # ⭐ NUEVO - Context de usuario
├── app/
│   ├── layout.tsx               # ✏️ MODIFICADO - Envuelto con Provider
│   ├── login/page.tsx           # ✏️ MODIFICADO - Usa Context
│   ├── profile/page.tsx         # ✏️ MODIFICADO - Usa Context
│   └── components/
│       ├── header_panel.tsx     # ✏️ MODIFICADO - Simplificado
│       └── ExampleComponent.tsx # ⭐ NUEVO - Ejemplo de uso
```

## 🚨 Cosas Importantes a Recordar

### ❗ **Siempre importar el hook:**
```tsx
import { useUser } from "@/context/UserContext";
```

### ❗ **Solo usar dentro de componentes envueltos por UserProvider:**
Si intentas usar `useUser()` fuera del Provider, obtendrás un error.

### ❗ **Manejar estados de carga:**
Siempre verifica `isLoading` antes de usar los datos del usuario.

### ❗ **Proteger rutas sensibles:**
Usa el patrón de protección de rutas en páginas que requieren autenticación.

## 🎓 Conceptos de React Context Explicados

### **¿Qué es Context?**
Context es como el sistema de altavoces de un centro comercial. En lugar de que cada tienda tenga que gritarle a la siguiente para pasar un mensaje, el centro comercial puede anunciar algo y TODAS las tiendas lo escuchan al mismo tiempo.

### **¿Cuándo usar Context?**
- Datos que necesitan múltiples componentes
- Estado de autenticación
- Tema/configuración de la app
- Datos del usuario actual

### **¿Cuándo NO usar Context?**
- Datos que solo necesita un componente
- Estados temporales (como el valor de un input)
- Datos que cambian muy frecuentemente

## 🐛 Resolución de Problemas Comunes

### **Error: "useUser must be used within a UserProvider"**
**Solución:** Asegúrate de que tu componente esté envuelto por `<UserProvider>` en el layout.

### **Los datos del usuario no se actualizan**
**Solución:** Verifica que estés usando `useUser()` correctamente y no estados locales.

### **Redirecciones infinitas**
**Solución:** Asegúrate de manejar correctamente el estado `isLoading` antes de hacer redirecciones.

## 🏆 Conclusión

Felicitaciones, ahora tienes un sistema de autenticación centralizado que:
- Elimina código duplicado
- Maneja automáticamente la validación de tokens
- Proporciona datos del usuario a toda la app
- Protege rutas automáticamente
- Es fácil de mantener y expandir

¡Ya puedes presumir que manejas estado global como un verdadero profesional de React! 🎉

---

**Última actualización:** Julio 23, 2025  
**Creado por:** Un desarrollador con mucho sarcasmo que te enseñó Context 😎
