# Esteban Gamboa · Portafolio

Portafolio personal construido con React + TypeScript + Vite.

## Stack

- **React 18** + TypeScript
- **Vite** (build tool)
- **GSAP** + ScrollSmoother (animaciones y scroll suave)
- **Three.js** + React Three Fiber + Rapier (Tech Stack 3D con física)
- **react-icons**

## Instalación local

```bash
npm install
npm run dev
```

## Deploy en Vercel

1. Sube este proyecto a un repositorio en GitHub
2. Ve a [vercel.com](https://vercel.com) → "New Project"
3. Importa tu repositorio
4. Deja todas las configuraciones por defecto (Vercel detecta Vite automáticamente)
5. Click en **Deploy** ✅

> El archivo `vercel.json` ya está incluido para el manejo correcto de rutas SPA.

## Estructura

```
src/
├── components/
│   ├── styles/         # CSS por componente
│   ├── utils/          # GSAP helpers
│   ├── Navbar.tsx      # Nav + ScrollSmoother
│   ├── Landing.tsx     # Hero section
│   ├── About.tsx       # Sobre mí
│   ├── WhatIDo.tsx     # Lo que hago (hover interactivo)
│   ├── Career.tsx      # Experiencia / timeline
│   ├── Work.tsx        # Proyectos (scroll horizontal)
│   ├── TechStack.tsx   # Esferas 3D con física
│   ├── Contact.tsx     # Contacto
│   ├── Cursor.tsx      # Cursor personalizado
│   └── Loading.tsx     # Pantalla de carga
├── context/
│   └── LoadingProvider.tsx
└── main.tsx
```
