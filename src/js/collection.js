import { Cards } from '../components/cards.js';
import { initializeCategoryTab } from '../components/category-tab.js';
import heroInitalized from '../components/hero-search.js';
import { initializeLayout } from '../components/layout.js';
import { initializePagination } from '../components/pagination.js';
import { APP_API_URL } from '../libs/constant.js';

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
    newReleaseBooksContainer.innerHTML = Cards.skeleton({
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
        newReleaseBooksContainer.innerHTML = books.map(Cards.book).join('');

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

    heroInitalized((currentPage)=> {
        initializeCategoryTab();
        initializeBooks(currentPage);
    })

    initializeCategoryTab();

    // Get initial page from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;

    await initializeBooks(initialPage);
});
