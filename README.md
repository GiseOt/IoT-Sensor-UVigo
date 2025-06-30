# IoT Sensor Monitor

**Aplicación web para administrar sensores de IoT.**
# 🚀 Desafío Frontend - Gestión de Sensores IoT

Esta aplicación web permite visualizar y gestionar sensores de un sistema IoT con comunicación en tiempo real utilizando el protocolo NATS (simulado o real).


## 📌 Tecnologías Utilizadas

- **React** + **Vite**
- **TypeScript**
- **Material UI** para UI consistente
- **nats.ws**
- **Simulación de backend** (modo mock)
- **React Hook Form** para validación de formularios
- **React Testing Library** y **jest*** para los testeos.

## ✅ Funcionalidades Implementadas

### 1. 🧑‍💻 Pantalla de Autenticación

- Login simulado con formulario.
- Al iniciar sesión, se guarda un flag en `localStorage`.
- No requiere backend real.

---

### 2. 📊 Visualización de Sensores

- Tabla con todos los sensores disponibles.
- Ordenamiento por id , nombre, tipo, valor y estado.
- Filtros por nombre, tipo y estado.
- Última actualización visible por sensor.

---

### 3. 🛠 Gestión de Sensores (CRUD)

- Crear, editar y eliminar sensores.
- Formulario validado:
  - No permite campos vacíos.
  - Validaciones de tipo (nombre como string, valor como float, etc).

---

### 4. 🔄 Comunicación en Tiempo Real con NATS

La aplicación se conecta a un servidor NATS en `ws://localhost:4222` utilizando `nats.ws`.

#### ⚠️ ¿Y si no tengo un servidor NATS?

No hay problema. Si el servidor no está disponible, la app entra automáticamente en un **modo simulado**, que:

- Genera sensores ficticios.
- Simula cambios de valores aleatorios cada pocos segundos.
- Permite ver cambios en tiempo real sin levantar infraestructura adicional como Docker o un servidor NATS local.



---

## 🧪 Tests

- Se realizaron tests unitarios utilizando React Testing Library y Jest.
- Se verificó la correcta renderización de elementos clave: textos, botones, campos de búsqueda y filtros.

- Comprobación de que filtros y botones respondan a eventos básicos

- Para ejecutar los tests, se usa el comando: npm run test

## Autora
Gisella Analía Ortiz de la Tabla-

## 🚀 Cómo Ejecutar la App

### Clonar el repositorio
git clone https://github.com/GiseOt/IoT-Sensor-UVigo.git

### Entrar a la carpeta del proyecto
cd IoT-Sensor-UVigo

### Instalar dependencias
npm install

### Ejecutar el proyecto (modo desarrollo)
npm run dev

### Ejecutar los tests
npm run test
