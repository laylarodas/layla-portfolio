# Layla Rodas - Portfolio Personal

Portfolio personal moderno y responsive construido con React, Vite y Tailwind CSS.

🔗 **Live:** [layla-portfolio-zeta.vercel.app](https://layla-portfolio-zeta.vercel.app/)

## Características

- **Tema Dark/Light** - Toggle con persistencia en localStorage (dark por defecto)
- **Diseño Responsive** - Adaptado a todos los dispositivos
- **Accesible** - Focus states, ARIA labels, buen contraste
- **Animaciones suaves** - Efectos fade-in y transiciones hover
- **Stack moderno** - React 18, Vite 5, Tailwind CSS 3

## Secciones

- **Hero** - Introducción con links sociales y descarga de CV
- **Proyectos** - 6 proyectos reales con stack y links a GitHub
- **Skills** - Tecnologías agrupadas por categoría
- **Sobre mí** - Información personal y background
- **Contacto** - Email y links sociales

## Stack Técnico

- [React](https://reactjs.org/) - Librería UI
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Google Fonts](https://fonts.google.com/) - Tipografía (Inter, JetBrains Mono)

## Desarrollo Local

### Requisitos

- Node.js 18+ 
- npm

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/laylarodas/layla-portfolio.git
cd layla-portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173)

### Build de Producción

```bash
npm run build
```

## Estructura del Proyecto

```
src/
├── components/         # Componentes UI reutilizables
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── SectionTitle.jsx
│   ├── Tag.jsx
│   └── ThemeToggle.jsx
├── data/
│   └── projects.js     # Datos de proyectos
├── sections/           # Secciones de la página
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Hero.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── App.jsx             # Componente principal
├── index.css           # Estilos globales
└── main.jsx            # Entry point
```

## Deploy

Desplegado automáticamente en [Vercel](https://vercel.com) con cada push a `main`.

## Contacto

- GitHub: [@laylarodas](https://github.com/laylarodas)
- LinkedIn: [Layla Rodas](https://www.linkedin.com/in/laylarodas/)
- Email: rodas.layla@gmail.com
