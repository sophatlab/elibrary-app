import { Cards } from '../components/cards.js';
import { Icons } from '../components/icons.js';
import { initializeLayout } from '../components/layout.js';
import { initializePagination } from '../components/pagination.js';
import { APP_API_URL, imageSource } from '../libs/constant.js';
import { initializeCategoryTab } from '../components/category-tab.js';


const bookInitial = async () => {
    // get the id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    const authorProfile = document.getElementById('author-profile');

    const profile = await fetch(new URL(`/api/v1/authors/${bookId}`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching book:', error);
            return {};
        });

    if (profile.id === undefined) location.href = new URL('404', location.origin).toString();

    authorProfile.innerHTML = (`
        <div class="min-h-72 w-full relative bg-gradient-to-b from-primary/50 border-x border-t border-dashed border-border to-transparent rounded-2xl mb-5">
            <button class="button button-primary absolute px-2 right-5 top-5" onclick="navigator.share({
                title: '${profile.name} author of eBooks',
                text: 'Check out this author: ${profile.name}',
                url: window.location.href
            })">
                ${Icons.share()}
            </button>
            <div class="absolute max-sm:flex-col flex gap-5 -bottom-24 left-5">
                <img
                    src="${imageSource.src(`api/v1/files/authors/${profile.image}`, { w: 512 })}"
                    srcset="${imageSource.srcset(`api/v1/files/authors/${profile.image}`)}"
                    class="max-sm:size-32 size-48 rounded-full bg-background"
                    alt="${profile.name}"/>
                <ul class="translate-y-2">
                    <h1 class="text-4xl font-bold">${profile.name}</h1>
                    <p class="mt-2">${profile.biography}</p>
                    <ul class="mt-3">
                        <li>
                            <a href="#" class="text-primary hover:underline inline-flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-book-2">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
                                    <path d="M19 16h-12a2 2 0 0 0 -2 2" />
                                    <path d="M9 8h6" />
                                </svg>
                                <span>${profile.books_count || 0} Book(s)</span>
                            </a>
                        </li>
                        <li>
                            <a href="${profile.website}" target="_blank" class="text-primary hover:underline inline-flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-world">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                    <path d="M3.6 9h16.8" />
                                    <path d="M3.6 15h16.8" />
                                    <path d="M11.5 3a17 17 0 0 0 0 18" />
                                    <path d="M12.5 3a17 17 0 0 1 0 18" />
                                </svg>
                                <span>${profile.website}</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.google.com/search?q=${profile.nationality}" class="text-primary hover:underline inline-flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-map-pin">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                </svg>
                                <span>${profile.nationality}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `)
}

let BOOKS_PER_PAGE = 10;

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
        length: BOOKS_PER_PAGE
    });
    paginationContainer.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category');

    const url = new URL(`/api/v1/ebooks/category/${urlParams.get('id')}`, APP_API_URL);
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
    initializeLayout()

    // Get initial page from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;

    await bookInitial();
    initializeCategoryTab();
    await initializeBooks(initialPage);
});
