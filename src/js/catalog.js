import { initializeLayout } from '../components/layout.js';
import { initializeCatalog } from '../components/catalog.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize layout
    initializeLayout()
    initializeCatalog();
});
