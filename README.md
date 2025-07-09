# eLibrary App

A modern multi-page eLibrary application built with Webpack, HTML, and Tailwind CSS.

## Features

- **Multi-page Architecture**: Separate pages for Home, Catalog, Book Details, and Admin Panel
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Modern Build System**: Webpack with hot module replacement for development
- **Code Splitting**: Optimized bundle splitting for better performance
- **Asset Management**: Automatic handling of images, fonts, and CSS

## Pages

1. **Home Page** (`/`) - Landing page with hero section and features
2. **Catalog Page** (`/catalog.html`) - Browse and search books
3. **Book Details Page** (`/book.html`) - Detailed view of individual books
4. **Admin Panel** (`/admin.html`) - Manage books and library settings

## Project Structure

```
elibrary-app/
├── src/
│   ├── js/                 # JavaScript entry points
│   │   ├── index.js        # Home page
│   │   ├── catalog.js      # Catalog page
│   │   ├── book.js         # Book details page
│   │   └── admin.js        # Admin panel
│   ├── components/         # Reusable components
│   │   ├── navigation.js
│   │   ├── hero.js
│   │   ├── catalog.js
│   │   ├── book-details.js
│   │   └── admin.js
│   ├── pages/          # HTML templates
│   │   ├── index.html
│   │   ├── catalog.html
│   │   ├── book.html
│   │   └── admin.html
│   └── style/
│       └── main.css        # Tailwind CSS
├── dist/                   # Built files (generated)
├── webpack.config.js       # Webpack configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.mjs      # PostCSS configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
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

This will create optimized files in the `dist/` directory.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start development server and open browser

## Webpack Configuration

The Webpack configuration includes:

- **Multiple Entry Points**: Each page has its own entry point
- **HTML Generation**: Automatic HTML file generation for each page
- **CSS Extraction**: Separate CSS files for production
- **Asset Management**: Handling of images, fonts, and other assets
- **Code Splitting**: Vendor and common chunk splitting
- **Dev Server**: Hot module replacement and history API fallback

## Tailwind CSS

The project uses Tailwind CSS v4 with PostCSS for styling. The configuration includes:

- Modern utility classes
- Responsive design utilities
- Custom color palette
- Component-friendly structure

## Features

### Navigation
- Responsive navigation with mobile menu
- Active page highlighting
- Smooth transitions

### Home Page
- Hero section with call-to-action buttons
- Features showcase
- Modern gradient design

### Catalog Page
- Book grid layout
- Search functionality
- Genre filtering
- Loading states

### Book Details Page
- Detailed book information
- Rating display
- Related books section
- Action buttons

### Admin Panel
- Statistics dashboard
- Book management table
- Add/Edit/Delete functionality
- Search and filtering
- Modal dialogs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## License

This project is licensed under the MIT License.
