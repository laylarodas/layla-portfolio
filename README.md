# Layla Rodas - Personal Portfolio

A modern, responsive single-page portfolio built with React, Vite, and Tailwind CSS.

![Portfolio Preview](https://via.placeholder.com/800x400/111113/d17a3e?text=Layla+Rodas+Portfolio)

## Features

- **Dark/Light Theme** - Toggle with localStorage persistence (dark by default)
- **Responsive Design** - Fully responsive across all devices
- **Accessible** - Proper focus states, ARIA labels, and good contrast ratios
- **Smooth Animations** - Fade-in effects and hover transitions
- **Modern Stack** - React 18, Vite 5, Tailwind CSS 3

## Sections

- **Hero** - Introduction with social links and CV download
- **Projects** - 6 featured projects with stack tags and live demos
- **Skills** - Technologies grouped by category
- **About** - Background and personal information
- **Contact** - Email and social links

## Tech Stack

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Google Fonts](https://fonts.google.com/) - Typography (Outfit, Sora, JetBrains Mono)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/layla-rodas/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and configure the build
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```js
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

## Customization

### Update Personal Info

Edit the following files:
- `src/sections/Hero.jsx` - Name, headline, summary
- `src/sections/About.jsx` - Biography and facts
- `src/sections/Contact.jsx` - Email address
- `src/data/projects.js` - Your projects

### Update CV

Replace `public/cv.pdf` with your own CV file.

### Change Colors

Edit `tailwind.config.js` to modify the color palette:
- `warm` - Accent color (currently amber/orange)
- `dark` - Background shades

### Add/Remove Projects

Edit `src/data/projects.js`. Each project should have:
```js
{
  id: 1,
  title: "Project Name",
  description: "Short description",
  stack: ["Tech1", "Tech2"],
  features: ["Feature 1", "Feature 2", "Feature 3"],
  githubUrl: "https://github.com/...",
  demoUrl: "https://..." // optional
  status: "completed" // or "in-progress"
}
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── SectionTitle.jsx
│   ├── Tag.jsx
│   └── ThemeToggle.jsx
├── data/
│   └── projects.js     # Project data
├── sections/           # Page sections
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Hero.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── App.jsx             # Main app component
├── index.css           # Global styles
└── main.jsx            # Entry point
```

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- GitHub: [@layla-rodas](https://github.com/layla-rodas)
- LinkedIn: [Layla Rodas](https://linkedin.com/in/layla-rodas)
