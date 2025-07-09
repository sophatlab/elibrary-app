import { initializeAdmin } from '../components/admin.js';
import { initializeLayout } from '../components/layout.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout()
    initializeAdmin();
});
