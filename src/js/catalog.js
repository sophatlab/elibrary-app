import { initializeLayout } from '../components/layout.js';
import { loadingCard } from '../components/loading.js';
import { APP_API_URL } from '../libs/constant.js';

const categories = [
    { name: 'All', isActive: true, url: '?category=All' },
    { name: 'Recommendations', isActive: false, url: '?category=Recommendations' },
    { name: 'ភាសាខ្មែរ', isActive: false, url: '?category=ភាសាខ្មែរ' },
    { name: 'គណិតវិទ្យា', isActive: false, url: '?category=គណិតវិទ្យា' }
];


const initializeCategoryTab = () => {
    const categoryContainer = document.getElementById('category-tab');
    categoryContainer.innerHTML = categories.map(category => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category');
        return (
            `<li class="shrink-0">
                <a href="${category.url}" class="button ${(currentCategory === category.name || (currentCategory === null && category.isActive))
                ? 'button-primary' : 'text-primary ring-primary ring hover:bg-primary hover:text-primary-foreground'}">
                    ${category.name}
                </a>
            </li>`
        );
    }).join('');
};

const initializeBooks = async () => {
    const newReleaseBooksContainer = document.getElementById('ebooks');
    newReleaseBooksContainer.innerHTML = loadingCard({ length: 10, className: "shrink-0 w-full aspect-[3/4] sm:w-44 overflow-hidden" });
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category');

    const url = new URL(`/api/v1/ebooks`, APP_API_URL);
    if (currentCategory && currentCategory !== 'All') {
        url.searchParams.append('category', currentCategory);
    }

    const books = await fetch(url)
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching books:', error);
            return [];
        });

    newReleaseBooksContainer.innerHTML = books.map(book => `
        <li class="shrink-0 w-full sm:w-44 overflow-hidden">
            <div class="border border-border/10 rounded-lg w-full aspect-[3/4] bg-foreground/10 relative">
                <img
                    src="${new URL(`${book.image}?q=10&w=50`, APP_API_URL)}"
                    srcset="${new URL(`${book.image}?q=10&w=100`, APP_API_URL)} 100w,
                            ${new URL(`${book.image}?q=40&w=200`, APP_API_URL)} 200w,
                            ${new URL(`${book.image}?q=60&w=250`, APP_API_URL)} 250w"
                    sizes="(max-width: 640px) 100vw, 176px"
                    alt="${book.title}"
                    loading="lazy"
                    width="250"
                    height="333"
                    class="w-full h-full rounded-lg object-cover transition-opacity duration-300 opacity-0 absolute inset-0"
                    onload="this.classList.remove('opacity-0')"
                    onerror="this.src='../assets/images/placeholder.png'; this.classList.remove('opacity-0')"
                >
            </div>
            <div class="mb-2">
                <h3 class="font-semibold">${book.title}</h3>
                <p class="text-xs">${book.author}</p>
            </div>
        </li>
    `).join('');
};



document.addEventListener('DOMContentLoaded', async () => {
    // Initialize layout
    initializeLayout()

    // Initialize category tab
    initializeCategoryTab()
    await initializeBooks()
});
