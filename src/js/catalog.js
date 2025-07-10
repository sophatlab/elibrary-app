import { initializeLayout } from '../components/layout.js';
import { loadingCard } from '../components/loading.js';
import { initializePagination } from '../components/pagination.js';
import { APP_API_URL } from '../libs/constant.js';

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
            <li class="shrink-0 w-full sm:w-[11.85rem] overflow-hidden">
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
    initializeCategoryTab();

    // Get initial page from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;

    await initializeBooks(initialPage);
});
