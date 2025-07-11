import { initializeLayout } from "../components/layout.js";
import cover from "../assets/covers/home-cover.png";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the layout
    initializeLayout();

    // Set the page title for 404
    document.title = 'eBooks Library - Page Not Found';

    // Add a class to the body for 404 styling
    document.body.classList.add('not-found');


    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.innerHTML = `
            <div class="max-w-7xl px-4 sm:px-6 lg:px-8 min-h-44">
                <div class="absolute flex justify-end inset-0 -right-5">
                    <img src="${cover}" loading="lazy" alt="Hero Cover Image" class="h-full object-cover">
                </div>
                <div class="absolute flex justify-center bg-gradient-to-t inset-0 p-5 to-transparent from-background flex-col gap-4 items-center">
                    <h1 class="text-3xl max-md:text-primary-foreground sm:text-4xl mt-10 text-primary md:text-5xl font-bold">Oops! Error 404</h1>
                    <p class="text-lg md:text-xl mb-8 text-foreground/50" aria-live="polite">Sorry! The page is not found.</p>
                    <p class="text-lg md:text-xl mb-8 text-foreground/50" aria-live="polite">If you want to read more about my information please choose one of the buttons blew.</p>
                    <div class="flex flex-col sm:flex-row gap-2 justify-center">
                        <a href="/collection" class="button button-primary">
                            Back to Collection
                        </a>
                        <a href="/" class="button ring ring-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
});