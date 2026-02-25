# Frontend - Sistema de Gestión de Tickets

Aplicación web desarrollada con React y Vite para gestionar tickets de soporte técnico, interfaz de usuario del sistema

## 🚀 Tecnologías
- React 19
- Vite 7.3.1
- React Router DOM 7.13.0
- Axios 1.13.5
- Tailwind CSS 4.2.0
- LocalStorage para gestión de sesión
- JavaScript ES6+

## 📋 Características
- Autenticación con JWT
- CRUD completo de Clientes, Técnicos y Tickets
- Rutas protegidas con validación de token
- Sistema de alertas internas
- Diseño responsivo y profesional
- Interceptor automático de tokens
- Manejo de errores y validaciones
- Estado de carga en operaciones asíncronas
- Dashboard con estadísticas en tiempo real

## 🎨 Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx           # Barra de navegación principal
│   ├── ProtectedRoute.jsx   # Componente de rutas protegidas
│   └── Alert.jsx           # Sistema de alertas
├── pages/
│   ├── Login.jsx            # Página de inicio de sesión
│   ├── Dashboard.jsx        # Panel principal con estadísticas
│   ├── Clientes.jsx         # Gestión de clientes
│   ├── Tecnicos.jsx         # Gestión de técnicos
│   └── Tickets.jsx          # Gestión de tickets
├── services/
│   ├── api.js               # Configuración base de Axios
│   ├── authService.js       # Servicio de autenticación
│   ├── clienteService.js    # CRUD de clientes
│   ├── tecnicoService.js    # CRUD de técnicos
│   └── ticketService.js     # CRUD de tickets
├── router/
│   └── AppRouter.jsx        # Configuración de rutas
├── App.jsx                   # Componente principal
├── main.jsx                  # Punto de entrada de la aplicación
└── index.css                 # Estilos globales con Tailwind CSS
```

## 🔌 Conexión con el Backend

### Configuración de API
- **URL Base**: `http://localhost:5000/api` 
- **Autenticación**: Token JWT en header `Authorization: Bearer {token}` 
- **Timeout**: 10 segundos por petición

### Endpoints Utilizados

#### Autenticación
```
POST /api/auth/login - Iniciar sesión
```

#### Clientes (requiere autenticación)
```
GET    /api/clientes        - Listar todos
POST   /api/clientes        - Crear nuevo
PUT    /api/clientes/{id}   - Actualizar
DELETE /api/clientes/{id}   - Eliminar
```

#### Técnicos (requiere autenticación)
```
GET    /api/tecnicos        - Listar todos
POST   /api/tecnicos        - Crear nuevo
PUT    /api/tecnicos/{id}   - Actualizar
DELETE /api/tecnicos/{id}   - Eliminar
```

#### Tickets (requiere autenticación)
```
GET    /api/tickets        - Listar todos
POST   /api/tickets        - Crear nuevo
PUT    /api/tickets/{id}   - Actualizar
DELETE /api/tickets/{id}   - Eliminar
```

## ⚙️ Configuración e Instalación

### Prerrequisitos
- Node.js 18+
- NPM o Yarn
- Backend corriendo en `http://localhost:5000` 

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Ivanp2003/Examen_Caso4_Frontend.git
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Configuración de Entorno
El frontend está configurado para funcionar con el backend en `http://localhost:5000/api`. Si necesitas cambiar la URL del backend, modifica `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: "https://tu-backend.com/api", // Cambiar esta línea
});
```

### Ejecución
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` 

## 🔐 Flujo de Autenticación

### 1. Inicio de Sesión
- **URL**: `/login` 
- **Proceso**: El frontend envía credenciales al backend, recibe token JWT y datos del usuario, los guarda en localStorage y redirige al dashboard.

### 2. Sesión Activa
- **Token**: Almacenado en localStorage
- **Validación**: Cada petición incluye el token en header `Authorization: Bearer {token}` 
- **Expiración**: Si el token expira o es inválido, redirige automáticamente a `/login` 

### 3. Cierre de Sesión
- **Proceso**: Elimina token y datos del usuario de localStorage, redirige a `/login` 

## 📊 Módulos del Sistema

### 1. Dashboard (`/dashboard`)
- **Función**: Panel principal con estadísticas en tiempo real
- **Características**:
  - Bienvenida personalizada
  - Estadísticas dinámicas (total clientes, técnicos, tickets)
  - Navegación rápida a todas las secciones
  - Acciones rápidas
  - Diseño completamente responsivo

### 2. Clientes (`/clientes`)
- **Función**: CRUD completo de clientes
- **Campos**: Nombre, Email, Teléfono, Dirección
- **Operaciones**: Crear, Leer, Actualizar, Eliminar
- **Validaciones**: Email requerido, formato válido

### 3. Técnicos (`/tecnicos`)
- **Función**: CRUD completo de técnicos
- **Campos**: Nombre, Email, Especialidad, Teléfono
- **Operaciones**: Crear, Leer, Actualizar, Eliminar
- **Validaciones**: Email requerido, especialidad obligatoria

### 4. Tickets (`/tickets`)
- **Función**: CRUD completo de tickets de soporte
- **Campos**: Título, Descripción, Cliente (select), Técnico (select), Estado, Prioridad
- **Operaciones**: Crear, Leer, Actualizar, Eliminar
- **Relaciones**: Cliente y Técnico deben existir en la base de datos

## 🎨 Diseño y Experiencia de Usuario

### Paleta de Colores
- **Principal**: Azul `#3b82f6` 
- **Secundario**: Púrpura `#8b5cf6` 
- **Éxito**: Verde `#10b981` 
- **Error**: Rojo `#ef4444` 
- **Advertencia**: Amarillo `#f59e0b` 

### Características de UX
- **Alertas internas**: Sistema de notificaciones no intrusivo
- **Indicadores de carga**: Spinners y estados de carga
- **Confirmaciones**: Diálogos de confirmación para operaciones destructivas
- **Mensajes de error**: Claros y específicos del backend
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves y microinteracciones

## 🔧 Características Técnicas

### Gestión de Estado
- **Autenticación**: localStorage
- **Formularios**: Estado local por componente
- **Datos del Dashboard**: Estado local con actualización desde backend

### Manejo de Errores
- **Interceptor Axios**: Captura automática de errores 401/403
- **Alertas**: Mensajes específicos del backend
- **Validaciones**: Validación básica en frontend + validación completa en backend

### Optimizaciones
- **Lazy Loading**: Carga de datos bajo demanda
- **Caching**: Token JWT almacenado localmente
- **Timeout**: 10 segundos para evitar esperas infinitas
- **Responsive Design**: Mobile-first approach

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
# Construir para producción
npm run build

# Previsualizar producción
npm run preview
```

### Variables de Entorno
Para producción, puedes configurar variables de entorno en un archivo `.env.production`:
```
VITE_API_URL=https://tu-backend.com/api
```

## 🔍 Depuración y Troubleshooting

### Problemas Comunes

#### 1. Error de CORS
- **Síntoma**: "Access-Control-Allow-Origin header is present on the requested resource"
- **Solución**: Asegúrate que el backend permita `http://localhost:5173` 

#### 2. Error 403 Forbidden
- **Síntoma**: "Failed to load resource: the server responded with a status of 403"
- **Solución**: Verifica que el token JWT sea válido y no esté expirado

#### 3. Error de Conexión
- **Síntoma**: "Network Error" o "ERR_CONNECTION_REFUSED"
- **Solución**: Verifica que el backend esté corriendo y accesible

#### 4. Error 400 en Tickets
- **Síntoma**: "Bad Request" con datos inválidos
- **Solución**: Verifica que todos los campos requeridos estén completos y válidos

### Logs y Consola
- **Navegador**: F12 → Console para ver logs del frontend
- **Red**: F12 → Network para ver peticiones HTTP
- **Backend**: Consola del servidor Node.js/Express

## 📱 Características Responsive

### Mobile (< 768px)
- **Navbar**: Menú hamburguesa animado
- **Cards**: Layout de una columna
- **Forms**: Campos ocupando todo el ancho
- **Buttons**: Tamaño touch-friendly

### Tablet (768px - 1024px)
- **Grid**: 2 columnas para estadísticas
- **Cards**: Layout de 2 columnas
- **Navigation**: Menú horizontal colapsable

### Desktop (> 1024px)
- **Grid**: 4 columnas para estadísticas
- **Cards**: Layout de 3 columnas
- **Navigation**: Menú completo horizontal

## 🎯 Mejoras Implementadas

### UX/UI
- ✅ Diseño moderno con Tailwind CSS
- ✅ Animaciones y transiciones suaves
- ✅ Estados de carga visibles
- ✅ Sistema de alertas contextual
- ✅ Diseño 100% responsivo
- ✅ Favicon personalizado

### Funcionalidades
- ✅ Dashboard con datos en tiempo real
- ✅ CRUD completo para todos los módulos
- ✅ Autenticación JWT segura
- ✅ Manejo automático de errores
- ✅ Validaciones frontend y backend
- ✅ Interceptor de tokens automático


