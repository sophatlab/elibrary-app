import { initializeBookDetails } from '../components/book-details.js';
import { initializeLayout } from '../components/layout.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout()
    initializeBookDetails();
});
