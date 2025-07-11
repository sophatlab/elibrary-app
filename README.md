# eLibrary App

A modern multi-page eLibrary application built with Webpack, JavaScript ES6 modules, and Tailwind CSS v4.

## Features

- **Multi-page Architecture**: Separate pages for Home, Collection, Book Details, and Admin Panel
- **Modern JavaScript**: ES6 modules with component-based architecture
- **Responsive Design**: Built with Tailwind CSS v4 for mobile-first responsive design
- **Dark/Light Theme**: Toggle between dark and light modes with localStorage persistence
- **Search Functionality**: Global search with modal interface
- **Modern Build System**: Webpack with hot module replacement and code splitting
- **Asset Management**: Automatic handling of images, fonts, and CSS with content hashing

## Pages

1. **Home Page** (`/`) - Landing page with hero section and call-to-action
2. **Collection Page** (`/collection/`) - Browse and search books catalog
3. **Book Details Page** (`/book/`) - Detailed view of individual books
4. **Admin Panel** (`/admin/`) - Administrative interface for managing books

## Project Structure

```
elibrary-app/
├── src/
│   ├── js/                     # JavaScript entry points
│   │   ├── index.js            # Home page
│   │   ├── collection.js       # Collection page
│   │   ├── [collection].js     # Dynamic collection routes
│   │   ├── book.js             # Book details page
│   │   └── admin.js            # Admin panel
│   ├── components/             # Reusable components
│   │   ├── navigation.js       # Header navigation with theme toggle
│   │   ├── hero.js             # Hero section component
│   │   ├── catalog.js          # Book catalog functionality
│   │   └── search.js           # Search modal component
│   ├── pages/                  # HTML templates
│   │   ├── index.html          # Home page
│   │   ├── collection.html     # Collection page
│   │   ├── [collection].html   # Dynamic collection template
│   │   ├── book.html           # Book details page
│   │   └── admin.html          # Admin panel
│   ├── assets/                 # Static assets
│   │   └── covers/             # Book cover images
│   └── style/
│       └── main.css            # Tailwind CSS v4
├── dist/                       # Built files (generated)
├── webpack.config.js           # Webpack configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

This will start the Webpack dev server at `http://localhost:3000` with hot module replacement.

### Build for Production

Build the application for production:
```bash
npm run build
```

This will create optimized files in the `dist/` directory with content hashing.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start development server and open browser

## Technical Features

### Component Architecture
- **Navigation Component**: Responsive header with logo, search, theme toggle, and GitHub link
- **Hero Component**: Landing page hero section with dynamic background
- **Search Component**: Modal-based search interface
- **Catalog Component**: Book grid with filtering and search functionality

### Theme System
- Dark/Light mode toggle with system preference detection
- localStorage persistence for theme preference
- Smooth transitions between themes
- Icon changes based on current theme

### Webpack Configuration
- **Multiple Entry Points**: Each page has its own JavaScript entry point
- **HTML Generation**: Automatic HTML file generation with proper chunking
- **CSS Extraction**: Separate CSS files for production with content hashing
- **Asset Management**: Optimized handling of images, fonts, and other assets
- **Code Splitting**: Vendor and common chunk splitting for optimal loading
- **History API Fallback**: Proper routing for single-page application behavior

### Tailwind CSS v4
- Latest Tailwind CSS with PostCSS integration
- Custom utility classes and components
- Responsive design utilities
- Modern color palette with CSS custom properties

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Features

### Hot Module Replacement
- Instant updates during development
- CSS hot reloading
- JavaScript module hot swapping

### Development Server
- Port 3000 with auto-open
- Compression enabled
- History API fallback for client-side routing

### Build Optimization
- Content hashing for cache busting
- Vendor chunk splitting
- Common chunk extraction
- Minification and optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing code style
4. Test your changes locally
5. Submit a pull request

## License

This project is licensed under the MIT License.
