# Server - Project Work Transit

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Este es el servidor (Backend) del proyecto **Work Transit**. Está construido con **NestJS** y **PostgresQL** como gestor de base de datos. La documentación de la API se genera y se encuentra disponible en el repositorio del **[Client Gateway]([https://github.com/Work-Transit-Backend-Microservices-Nest/client-gateway.git])**. Consulta el `README.md` de ese repositorio para obtener instrucciones sobre cómo acceder a la documentación de la API.

## 🚀 Arquitectura de Software – Backend (API)

### 📌 Tecnologías Utilizadas

- **Lenguaje de Programación:** JavaScript / TypeScript
- **Entorno de Ejecución:** Node.js
- **Framework:** NestJS 🚀
- **ORM:** TypeORM 🗄️
- **Gestor de Base de Datos:**
  - **PostgresQL** (Almacenamiento de datos)
  - **Redis** (Almacenamiento temporal en memoria)
- **Mensajería:** **NATS** (Comunicación entre microservicios) 🚀
- **Modelador / Administrador de Base de Datos:** ChartDB / TablePlus 🛠️
- **Contenerización:** Docker 🐳
- **Documentación:** Swagger 📄
- **Testing:**
  - **Jest** (Pruebas Unitarias e Integración 🔍)
  - **Insomnia** (Pruebas Funcionales 📡)

### 🏗️ Estilo y Patrón de Arquitectura y Patrones de Diseño

- **Estilo de Arquitectura:** Microservicios
- **Patrón de Arquitectura:** Modular (Propuesta por Nest) usando conceptos de MVC
- **Patrones de Diseño:**
  - **Estructurales:** Adapters, Decorators
  - **De Comportamiento:** Strategy

## 📦 Instalación y Ejecución

1. Clonar el repositorio:

   ```sh
   git clone git@github.com:JosmenDev/project-work-transit.git
   ```

2. Inicializar y actualizar los submodulos:

   ```sh
   git submodule update --init --recursive
   ```

4. Levantar la base de datos con Docker:

   ```sh
   docker-compose --project-name project-work-transit up -d 
   ```

## Actualización del Código del Backend (para el Frontend)

Cuando el equipo de backend realiza cambios en los microservicios, el frontend deberá seguir estos pasos para integrar las últimas actualizaciones:

1.  Actualizar el repositorio principal:
    ```bash
    git pull
    ```

2.  Actualizar los submódulos para obtener el código más reciente de los microservicios:
    ```bash
    git submodule update --remote
    ```