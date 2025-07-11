import cover from '../assets/covers/home-cover.png';

export class Hero {
    constructor() {
        this.heroSection = document.querySelector('#hero');
        this.initializeHero();
    }

    initializeHero() {
        if (!this.heroSection) return;

        this.heroSection.innerHTML = (`
            <div class="max-w-7xl px-4 sm:px-6 lg:px-8 min-h-44">

                <div class="absolute flex justify-end inset-0 -right-5">
                    <img src="${cover}" loading="lazy" alt="Hero Cover Image" class="h-full object-cover">
                </div>
                <div class="absolute flex bg-gradient-to-t inset-0 p-5 to-transparent from-background flex-col gap-4 items-start justify-start">
                    <h2 class="text-3xl sm:text-4xl text-primary md:text-5xl font-bold">Welcome to eBooks</h2>
                    <p class="text-lg md:text-xl mb-8 text-foreground/50">Discover thousands of books at your fingertips</p>
                    <div class="flex flex-col sm:flex-row gap-2 justify-center">
                        <a href="/collection" class="button button-primary">
                            Browse Collection
                        </a>
                        <a href="/admin.html" class="button ring ring-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            Download Books
                        </a>
                    </div>
                </div>
            </div>
        `)

    }
}

// Hero section component
export function initializeHero() {
    new Hero();
}
