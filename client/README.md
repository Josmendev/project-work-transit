# Client - Work Transit

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="200" height="200" />
</p>

Este es el cliente (frontend) del proyecto **Work Transit**. Está construido con **React** y utiliza **Vite** para un desarrollo más rápido y eficiente.

## 🚀 Arquitectura de Software – Frontend (SPA)

### 📌 Tecnologías Utilizadas

- **Lenguaje de Programación:** JavaScript / TypeScript
- **Librería:** React ⚛️
- **Gestor de Paquetes:** PNPM 📦
- **Gestión de Rutas:** React Router 🚏
- **Gestión de Formularios:** React Hook Form (con Zod para validaciones)
- **Gestión de Estado Global:** Context API (usando el Provider Pattern)
- **Manejo de Datos:** Fetch y React Query
- **Estilos:** Tailwind CSS 🎨

### 🧪 Testing

- **Jest** (Pruebas Unitarias - PU)
- **React Testing Library** (Pruebas de Componente - PC)

### 📡 Comunicación

- **SPA - RESTful**

### 🏗️ Patrón y Estilo de Arquitectura

- **Modular (Features)**
- **Cliente / Servidor (Monolítica)**

### 🔍 Consumo en Base a Documentación

- **Postman / Insomnia**

## 📦 Instalación y Ejecución

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/JosmenDev/project-certi-salud.git
   cd project-certi-salud/client
   ```

2. Instalar las dependencias con PNPM:

   ```sh
   pnpm install
   ```

3. Iniciar el servidor de desarrollo:

   ```sh
   pnpm run dev
   ```

## 📁 Estructura del Proyecto

```
client/
│-- src/
│   ├── features/               # Funcionalidades principales
│   │   ├── admin-routes/        # Módulo de administración de rutas de viaje
│   │   ├── admin-users/         # Gestión de usuarios
│   │   ├── auth/                # Autenticación
│   │   ├── trips/               # Módulo de viajes
│   │   ├── register-certificates/ # Módulo de administración de Vehículos
│   ├── router/                  # Definición de rutas
│   │   ├── AppRouter.tsx
│   │   ├── protected
│   │   │   ├── PrivateRoute.tsx
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── VehicleRoute.tsx
│   │   ├── PublicRoute.tsx
│   ├── shared/                   # Elementos reutilizables
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── helpers/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── reducer/
│   │   ├── schemas/
│   │   ├── sections/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── utils/
│   ├── main.tsx                 # Punto de entrada principal
│-- public/
│-- package.json
│-- pnpm-lock.yaml
│-- vite.config.js
│-- postcss.config.js
│-- eslint.config.js
│-- .gitignore
│-- README.md
```

## 📌 Notas Adicionales

- Asegúrate de tener **Node.js** instalado en tu máquina.
- ¡Adelante, pruebalo 😎😎😎!
