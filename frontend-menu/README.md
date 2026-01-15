
# Restaurant E-Menu Application (Frontend)

>This is the frontend for the Restaurant E-Menu Application, built with React, Vite, and Tailwind CSS.

## Features
- Modern responsive UI for digital restaurant menus
- Category navigation, search, and advanced filtering
- Dietary badges, spicy indicators, and item modals
- Dark mode toggle with system preference and persistence
- Mobile-first, accessible, and touch-friendly

## Tech Stack
- React 19
- Vite 7
- Tailwind CSS 3
- Lucide React Icons
- Axios (API calls)

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies
```
cd frontend-menu
npm install
```

### Start the development server
```
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) (or next available port).

### API Server
The frontend expects a mock API running at [http://localhost:3001](http://localhost:3001). Start it from the project root:
```
npm run api
```

## Project Structure

- `src/` — React components, hooks, and assets
- `App.jsx` — Main app and all UI logic
- `index.css` — Tailwind and global styles
- `tailwind.config.js` — Custom breakpoints, dark mode, and theme

## Customization

- **Footer Contact:**
	- Address: 123 Reid Avenue, Colombo
	- Phone: +94 11-22-00-000
- **Dark Mode:** Toggle in the header, persists preference

## Scripts
- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run lint` — Lint code
- `npm run preview` — Preview production build

---
© 2026 Softlien (Pvt) Ltd. For assessment/demo use only.
