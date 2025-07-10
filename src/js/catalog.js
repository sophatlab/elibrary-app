import { initializeLayout } from '../components/layout.js';
import { loadingCard } from '../components/loading.js';
import { initializePagination } from '../components/pagination.js';
import { APP_API_URL } from '../libs/constant.js';

const heroInitalized = () => {

    const currentSearchParams = new URLSearchParams(window.location.search);
    const searchTerm = currentSearchParams.get('search') || '';

    const heroContainer = document.getElementById('hero');
    if (heroContainer) {
        heroContainer.innerHTML = `
            <div class="hero-content text-center py-8">
                <h1 class="text-3xl font-bold mb-4">Welcome to the eLibrary</h1>
                <p class="text-muted-foreground mb-6">Explore our collection of eBooks and resources</p>
                <div class="search-container w-full max-w-md mx-auto">
                    <form id="search-form" class="relative">
                        <input
                            type="text"
                            id="search-input"
                            placeholder="Search for books, authors..."
                            value="${searchTerm}"
                            class="w-full px-5 py-2 rounded-full transition-all ring ring-primary bg-background/30 backdrop-blur-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                        <button type="submit" class="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        `;

        // Add event listener for search form with debounce
        const searchForm = document.getElementById('search-form');
        let searchTimeout = null;

        searchForm.addEventListener('input', (e) => {
            e.preventDefault();

            // Clear existing timeout
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }

            // Set a new timeout for debouncing
            searchTimeout = setTimeout(() => {
                // push history state with search term
                const searchTerm = document.getElementById('search-input').value.trim();
                const urlParams = new URLSearchParams(window.location.search);

                if (searchTerm) {
                    urlParams.set('search', searchTerm);
                    urlParams.delete('page');
                    window.history.pushState({ search: searchTerm }, '', `${window.location.pathname}?${urlParams.toString()}`);
                } else {
                    urlParams.delete('search');
                    urlParams.delete('page');
                    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
                }

                const currentPage = parseInt(urlParams.get('page')) || 1;
                initializeCategoryTab();
                initializeBooks(currentPage);
            }, 500);
        });
    }
}




const categories = [
    { name: 'All', isActive: true, url: '?category=All' },
    { name: 'Recommendations', isActive: false, url: '?category=Recommendations' },
    { name: 'ភាសាខ្មែរ', isActive: false, url: '?category=ភាសាខ្មែរ' },
    { name: 'គណិតវិទ្យា', isActive: false, url: '?category=គណិតវិទ្យា' }
];

// Set books per page based on screen size
const getBookPerPage = () => {

    if (window.innerWidth < 640) { // mobile
        return 8;
    } else if (window.innerWidth < 1024) { // tablet
        return 9;
    } else { // desktop
        return 12;
    }
};

let BOOKS_PER_PAGE = getBookPerPage();

// Update books per page when window resizes
window.addEventListener('resize', () => {
    const newBooksPerPage = getBookPerPage();
    if (newBooksPerPage !== BOOKS_PER_PAGE) {
        BOOKS_PER_PAGE = newBooksPerPage;
        initializeBooks(currentPage);
    }
});

// Global variables to manage request state
let currentRequest = null;
let isLoading = false;
let currentPage = 1;

const initializeCategoryTab = () => {
    const categoryContainer = document.getElementById('category-tab');
    categoryContainer.innerHTML = categories.map(category => {

        // Get current URL parameters to preserve search terms
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category');

        const searchObject = Object.fromEntries(urlParams.entries());
        const itemObject = Object.fromEntries(new URLSearchParams(category.url).entries())
        const newUrlParams = new URLSearchParams({ ...searchObject, ...itemObject });

        return (
            `<li class="shrink-0">
                <a href="?${newUrlParams.toString()}" class="button ${(currentCategory === category.name || (currentCategory === null && category.isActive))
                ? 'button-primary' : 'text-primary ring-primary ring hover:bg-primary hover:text-primary-foreground'}">
                    ${category.name}
                </a>
            </li>`
        );
    }).join('');
};

const initializeBooks = async (page = 1) => {
    // Prevent multiple simultaneous requests
    if (isLoading && currentPage === page) {
        return;
    }

    // Cancel previous request if it exists
    if (currentRequest) {
        currentRequest.abort();
        currentRequest = null;
    }

    // Set loading state
    isLoading = true;
    currentPage = page;

    const newReleaseBooksContainer = document.getElementById('ebooks');
    const paginationContainer = document.getElementById('pagination-container');

    // Show loading state
    newReleaseBooksContainer.innerHTML = loadingCard({
        length: BOOKS_PER_PAGE,
        className: "shrink-0 w-full aspect-[3/4] sm:w-44 overflow-hidden"
    });
    paginationContainer.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category');

    const url = new URL(`/api/v1/ebooks`, APP_API_URL);
    if (currentCategory && currentCategory !== 'All') {
        url.searchParams.append('category', currentCategory);
    }

    // Add pagination parameters
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', BOOKS_PER_PAGE.toString());
    url.searchParams.append('search', urlParams.get('search') || '');

    // Create AbortController for this request
    const abortController = new AbortController();
    currentRequest = abortController;

    try {
        const response = await fetch(url, {
            signal: abortController.signal
        });

        // Check if request was aborted
        if (abortController.signal.aborted) {
            return;
        }

        const data = await response.json();

        const books = data.result || [];
        const totalBooks = data.total || books.length;
        const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);

        // Render books
        newReleaseBooksContainer.innerHTML = books.map(book => `
            <li class="shrink-0 w-full relative sm:w-[11.85rem] overflow-hidden">
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
                <a href="/book?id=${book.id}" class="absolute inset-0"></a>
            </li>
        `).join('');

        // Initialize pagination if there are multiple pages
        if (totalPages > 1) {
            initializePagination(paginationContainer, page, totalPages, (newPage) => {
                handlePageChange(newPage);
            });
        }

        // Show empty state if no books
        if (books.length === 0) {
            newReleaseBooksContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-muted-foreground">No books found in this category.</p>
                </div>
            `;
        }

    } catch (error) {
        // Don't show error if request was aborted
        if (error.name === 'AbortError') {
            console.log('Request was cancelled');
            return;
        }

        console.error('Error fetching books:', error);
        newReleaseBooksContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-muted-foreground">Error loading books. Please try again.</p>
            </div>
        `;
    } finally {
        // Reset loading state
        isLoading = false;
        currentRequest = null;
    }
};

const handlePageChange = (page) => {
    // Prevent multiple clicks for the same page
    if (isLoading || currentPage === page) {
        return;
    }

    // Update URL with new page
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', page.toString());

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ page }, '', newUrl);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Load new page
    initializeBooks(page);
};

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;

    // Only load if it's a different page
    if (page !== currentPage) {
        initializeBooks(page);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize layout
    initializeLayout();

    heroInitalized()

    initializeCategoryTab();

    // Get initial page from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;

    await initializeBooks(initialPage);
});
