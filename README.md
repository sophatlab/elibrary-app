# eLibrary App

A modern multi-page eLibrary application built with Webpack, JavaScript ES6 modules, and Tailwind CSS v4.

## Purpose

This project serves as an educational assignment for Year II, Semester II, Batch 23 students at Cambodian University for Specialties, designed to demonstrate:

- Modern web development techniques using JavaScript ES6+
- Component-based architecture for scalable applications
- Responsive design implementation with Tailwind CSS
- API integration and asynchronous data handling
- Build system configuration with Webpack
- Version control and project organization

The eLibrary App provides a practical platform for applying these concepts in a real-world application context.


## Team Members

- [Sophat LEAT](https://pphat.top) - Project Lead & Developer

## Features

### 📚 Core Library Features
- **Multi-page Architecture**: Separate pages for Home, Collection, Authors, Book Details, and Admin Panel
- **Book Catalog**: Browse extensive book collections with advanced filtering and pagination
- **Author Profiles**: Dedicated author pages with biographical information and book collections
- **Book Details**: Comprehensive book information with related recommendations
- **Advanced Search**: Global search functionality with modal interface and real-time results
- **Category Filtering**: Dynamic category tabs for organizing book collections

### 🎨 User Experience
- **Responsive Design**: Built with Tailwind CSS v4 for seamless mobile-first experience
- **Dark/Light Theme**: System-aware theme toggle with localStorage persistence
- **Loading Skeletons**: Smooth loading states for better perceived performance
- **Image Optimization**: Responsive images with srcset, lazy loading, and error fallbacks
- **Breadcrumb Navigation**: Clear navigation hierarchy across all pages
- **404 Error Handling**: Custom error pages for better user experience

### 🔧 Technical Features
- **Modern JavaScript**: ES6 modules with component-based architecture
- **API Integration**: Connected to external API (`https://api.sophat.top`) with error handling
- **Modern Build System**: Webpack with hot module replacement and code splitting
- **Asset Management**: Automatic handling of images, fonts, and CSS with content hashing
- **Component System**: Reusable card components with skeleton loading states
- **Performance Optimization**: Image optimization, lazy loading, and efficient rendering

### 👨‍💼 Admin Features
- **Admin Panel**: Administrative interface for managing books and collections
- **Content Management**: Tools for managing library content and metadata

## Pages

1. **Home Page** (`/`) - Landing page with hero section and featured books
2. **Collection Page** (`/collection/`) - Browse and search books catalog with category filtering
3. **Book Details Page** (`/collection/book/`) - Detailed view of individual books with related recommendations
4. **Authors Page** (`/authors/`) - Browse author profiles and their collections
5. **Author Profile Page** (`/authors/profile/`) - Individual author pages with biography and books
6. **Admin Panel** (`/admin/`) - Administrative interface for managing books
7. **404 Page** (`/404/`) - Custom error page for not found resources

## Project Structure

```
elibrary-app/
├── src/
│   ├── js/                     # JavaScript entry points
│   │   ├── index.js            # Home page
│   │   ├── collection.js       # Collection page
│   │   ├── [collection].js     # Book details page
│   │   ├── authors.js          # Authors listing page
│   │   ├── [authors].js        # Author profile page
│   │   ├── admin.js            # Admin panel
│   │   └── 404.js              # Error page
│   ├── components/             # Reusable components
│   │   ├── admin.js            # Admin panel functionality
│   │   ├── cards.js            # Book & author card components with skeletons
│   │   ├── category-tab.js     # Category filtering tabs
│   │   ├── detail-card.js      # Book detail card component
│   │   ├── hero.js             # Hero section component (home page)
│   │   ├── hero-search.js      # Hero with search (collection page)
│   │   ├── icons.js            # Icon components
│   │   ├── layout.js           # Layout initialization
│   │   ├── mobile-sidebar.js   # Mobile navigation sidebar
│   │   ├── navigation.js       # Header navigation with theme toggle
│   │   ├── pagination.js       # Pagination component
│   │   └── search.js           # Search modal component
│   ├── pages/                  # HTML templates
│   │   ├── index.html          # Home page
│   │   ├── collection.html     # Collection page
│   │   ├── [collection].html   # Book details page
│   │   ├── authors.html        # Authors listing page
│   │   ├── [authors].html      # Author profile page
│   │   ├── admin.html          # Admin panel
│   │   └── 404.html            # Error page
│   ├── assets/                 # Static assets
│   │   ├── badges/             # Badge images
│   │   │   ├── left-rice.png   # Left badge decoration
│   │   │   └── right-rice.png  # Right badge decoration
│   │   └── covers/             # Book cover images
│   │       └── home-cover.png  # Homepage hero cover
│   ├── libs/                   # Utility libraries
│   │   ├── constant.js         # API configuration & image optimization
│   │   └── tailwind.js         # Tailwind utility functions (cn helper)
│   └── style/
│       └── main.css            # Tailwind CSS v4 with custom styles
├── dist/                       # Built files (generated)
├── webpack.config.js           # Webpack configuration
├── postcss.config.mjs          # PostCSS configuration
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
- **Hero Components**: Landing page hero and search-enabled hero for collection page
- **Search Component**: Modal-based search interface with debounced API calls
- **Cards Component**: Reusable book and author card components with multiple variants:
  - `Cards.book()` - Standard book cards with cover and metadata
  - `Cards.relatedBook()` - Compact related book cards
  - `Cards.recommendedBook()` - Optimized recommendation cards
  - `Cards.author()` - Author profile cards with avatar and statistics
  - `Cards.skeleton()` - Book card loading skeletons
  - `Cards.authorSkeleton()` - Author card loading skeletons
- **Pagination Component**: Reusable pagination with page navigation
- **Mobile Sidebar**: Responsive mobile navigation with theme toggle
- **Category Tabs**: Dynamic category filtering for book collections
- **Detail Card**: Comprehensive book detail display component
- **Icon System**: Centralized icon components for consistent UI

### API Integration
- **External API**: Integrated with `https://api.sophat.top` for book and author data
- **Image Optimization**: 
  - Dynamic image sizing with srcset generation
  - Multiple image sizes (50w, 100w, 200w, 400w, 800w)
  - Quality optimization (q=60 for standard, q=10 for srcset)
  - Automatic error fallback images
- **Error Handling**: Graceful fallbacks for failed API calls and missing images
- **Performance**: Request optimization with lazy loading and efficient caching

### Theme System
- Dark/Light mode toggle with system preference detection
- localStorage persistence for theme preference
- Smooth transitions between themes
- Icon changes based on current theme

### Webpack Configuration
- **Multiple Entry Points**: Each page has its own JavaScript entry point (7 total pages)
- **HTML Generation**: Automatic HTML file generation with proper chunking
- **CSS Extraction**: Separate CSS files for production with content hashing
- **Asset Management**: Optimized handling of images, fonts, and other assets
- **Code Splitting**: Vendor and common chunk splitting for optimal loading
- **History API Fallback**: Proper routing for single-page application behavior
- **Clean Plugin**: Automatic cleanup of dist folder on builds

### Tailwind CSS v4
- Latest Tailwind CSS with PostCSS integration
- Custom utility classes and components with `tailwind-merge` integration
- Responsive design utilities with mobile-first approach
- Modern color palette with CSS custom properties
- Custom component classes for consistent styling
- `cn()` utility function for conditional class merging

## Performance Optimizations

- **Image Optimization**: 
  - Responsive images with automatic srcset generation
  - Lazy loading with intersection observer
  - WebP format support with fallbacks
  - Multiple size variants for different screen densities
- **Loading States**: Skeleton components for smooth loading experiences
- **Code Splitting**: Separate bundles for each page to reduce initial load time
- **Asset Optimization**: Content hashing for cache busting and long-term caching
- **Bundle Analysis**: Vendor and common chunk separation for optimal caching
- **Development Performance**: Hot module replacement for instant updates

## Accessibility Features

- **Semantic HTML**: Proper HTML5 semantic elements throughout
- **ARIA Labels**: Comprehensive aria-label attributes for screen readers
- **Keyboard Navigation**: Full keyboard accessibility support
- **Alt Text**: Descriptive alt text for all images
- **Focus Management**: Proper focus indicators and management
- **Color Contrast**: Accessible color combinations in both themes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Features

### Hot Module Replacement
- Instant updates during development without full page reloads
- CSS hot reloading for immediate style changes
- JavaScript module hot swapping for component updates
- Preserved application state during development

### Development Server
- Port 3000 with auto-open browser functionality
- Compression enabled for faster development loading
- History API fallback for client-side routing
- Automatic error overlay for debugging

### Build Optimization
- Content hashing for cache busting and long-term caching
- Vendor chunk splitting for optimal loading performance
- Common chunk extraction to reduce bundle duplication
- Minification and tree-shaking for production builds
- Asset optimization with automatic compression

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing code style
4. Test your changes locally
5. Submit a pull request

## License

This project is licensed under the MIT License.
