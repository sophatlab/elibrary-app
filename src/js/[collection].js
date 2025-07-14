import { Cards } from '../components/cards.js';
import { DetailCard } from '../components/detail-card.js';
import { initializeLayout } from '../components/layout.js';
import { initializePagination } from '../components/pagination.js';
import { APP_API_URL } from '../libs/constant.js';

const bookInitial = async () => {

    // get the id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    // validate bookId must be uuid format
    if (!bookId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(bookId)) {
        console.error('Invalid book ID:', bookId);
        return;
    }

    const bookDetail = document.getElementById('book-detail');
    bookDetail.innerHTML = DetailCard.skeleton({
        length: 1,
    });

    const book = await fetch(new URL(`/api/v1/ebooks/${bookId}`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching book:', error);
            return {};
        });

    if (book && book.id) {
        bookDetail.innerHTML = DetailCard.bookSection(book);
    } else {
        location.href = '/404';
    }
}

// Set books per page for related books
const getRelatedBooksPerPage = () => {
    if (window.innerWidth < 640) { // mobile
        return 6;
    } else if (window.innerWidth < 1024) { // tablet
        return 8;
    } else { // desktop
        return 10;
    }
};

let RELATED_BOOKS_PER_PAGE = getRelatedBooksPerPage();

// Update books per page when window resizes
window.addEventListener('resize', () => {
    const newBooksPerPage = getRelatedBooksPerPage();
    if (newBooksPerPage !== RELATED_BOOKS_PER_PAGE) {
        RELATED_BOOKS_PER_PAGE = newBooksPerPage;
        initializeRelatedBooks(1); // Reset to first page
    }
});

// Global variables for related books pagination
let currentRelatedPage = 1;
let currentRelatedRequest = null;
let isRelatedLoading = false;

const initializeRelatedBooks = async (page = 1) => {
    // Prevent multiple simultaneous requests
    if (isRelatedLoading && currentRelatedPage === page) {
        return;
    }

    // Cancel previous request if it exists
    if (currentRelatedRequest) {
        currentRelatedRequest.abort();
        currentRelatedRequest = null;
    }

    // Set loading state
    isRelatedLoading = true;
    currentRelatedPage = page;

    const id = new URLSearchParams(window.location.search).get('id');
    const relatedBooksContainer = document.getElementById('related-ebooks');
    const paginationContainer = document.getElementById('pagination-container');

    // Show loading state
    relatedBooksContainer.innerHTML = Cards.skeleton({
        length: 7,
        className: "shrink-0 w-full aspect-[3/4] sm:w-[7.9rem] overflow-hidden"
    });
    paginationContainer.innerHTML = '';

    // Create URL with pagination parameters
    const url = new URL(`/api/v1/ebooks/related/${id}`, APP_API_URL);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', RELATED_BOOKS_PER_PAGE.toString());

    // Create AbortController for this request
    const abortController = new AbortController();
    currentRelatedRequest = abortController;

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
        const totalPages = Math.ceil(totalBooks / RELATED_BOOKS_PER_PAGE);

        if (books.length > 0) {
            // Render books
            relatedBooksContainer.innerHTML = books.map(Cards.relatedBook).join('');

            // Initialize pagination if there are multiple pages
            if (totalPages > 1) {
                initializePagination(paginationContainer, page, totalPages, (newPage) => {
                    handleRelatedPageChange(newPage);
                });
            }
        } else {
            relatedBooksContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-muted-foreground">No related books found</p>
                </div>
            `;
        }

    } catch (error) {
        // Don't show error if request was aborted
        if (error.name === 'AbortError') {
            console.log('Related books request was cancelled');
            return;
        }

        console.error('Error fetching related books:', error);
        relatedBooksContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-muted-foreground">Error loading related books. Please try again.</p>
            </div>
        `;
    } finally {
        // Reset loading state
        isRelatedLoading = false;
        currentRelatedRequest = null;
    }
};

const handleRelatedPageChange = (page) => {
    // Prevent multiple clicks for the same page
    if (isRelatedLoading || currentRelatedPage === page) {
        return;
    }

    // Update URL with new page for related books
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('related_page', page.toString());

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ relatedPage: page }, '', newUrl);

    // Scroll to related books section
    const relatedSection = document.getElementById('related-ebooks');
    if (relatedSection) {
        relatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Load new page
    initializeRelatedBooks(page);
};

// Handle browser back/forward navigation for related books
window.addEventListener('popstate', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const relatedPage = parseInt(urlParams.get('related_page')) || 1;

    // Only load if it's a different page
    if (relatedPage !== currentRelatedPage) {
        initializeRelatedBooks(relatedPage);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    initializeLayout()

    await bookInitial();

    // Get initial related page from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialRelatedPage = parseInt(urlParams.get('related_page')) || 1;

    await initializeRelatedBooks(initialRelatedPage);
});
