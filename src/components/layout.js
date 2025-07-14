import '../style/main.css';
import { Navigation } from "./navigation.js";

const footerInit = () => {
    const footer = document.querySelector('#footer-section');
    if (footer) {
        footer.innerHTML = `
            <div class="w-full max-sm:flex-col text-sm text-foreground/80 flex items-center justify-between">
                <p>&copy; ${new Date().getFullYear()} eBooks, All Right Reseved.</p>
                <p>Designed & Developed with <span>🤍</span> by <a href="https://pphat.vercel.app/" target="_blank" class="font-medium hover:text-primary">Sophat LEAT (PPhat)</a> </p>
            </div>
        `;
    }
}

export const initializeLayout = () => {

    // Initialize navigation
    new Navigation();

    footerInit()
}