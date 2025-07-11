import { APP_API_URL } from "../libs/constant.js";

export class Search {
    constructor() {
        this.dialog = null;
        this.searchTimeout = null;
        this.originalBodyOverflow = null;
    }

    createSearchButton() {
        const searchButton = document.createElement('button');
        searchButton.classList = "w-full cursor-pointer inline-flex text-xs gap-1 py-1.5 px-3 items-center bg-foreground/5 border border-border rounded-4xl";
        searchButton.setAttribute('type', 'button');
        searchButton.setAttribute('role', 'search');
        searchButton.setAttribute('id', 'search-button');
        searchButton.innerHTML = (`
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
            </svg>
            Ctrl + K
        `);

        return (` <span class="sr-only">Search</span> ${searchButton.outerHTML} `)
    }

    createSearchDialog() {
        const dialog = document.createElement('div');
        dialog.id = 'search-dialog';
        dialog.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out opacity-0';
        dialog.innerHTML = `
            <div class="search-dialog bg-background/80 border border-border rounded-xl shadow-lg w-full max-w-lg mx-4 overflow-hidden transform transition-all duration-300 ease-in-out scale-95 translate-y-4">
                <div class="flex items-center border-b border-border px-4">
                    <svg class="size-4 mr-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                    <input
                        type="text"
                        id="search-dialog-input"
                        placeholder="Search books, authors, or categories..."
                        class="flex-1 bg-transparent border-0 py-4 text-sm outline-none placeholder:text-muted-foreground"
                        autocomplete="off"
                    />
                    <button id="close-search" class="p-1 cursor-pointer hover:bg-foreground/5 rounded transition-colors duration-200">
                        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="max-h-96 overflow-y-auto">
                    <div id="search-results" class="p-4">
                        <div class="text-sm text-muted-foreground text-center py-8">
                            Start typing to search for books...
                        </div>
                    </div>
                </div>
                <div class="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                    <div class="flex items-center justify-between">
                        <span>Press <kbd class="px-1 py-0.5 bg-foreground/10 rounded text-xs">Enter</kbd> to search</span>
                        <span>Press <kbd class="px-1 py-0.5 bg-foreground/10 rounded text-xs">Esc</kbd> to close</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);
        this.dialog = dialog;
        return dialog;
    }

    setupSearchDialog() {
        // Create dialog after DOM is loaded
        setTimeout(() => {
            const dialog = this.createSearchDialog();
            const searchButton = document.getElementById('search-button');
            const searchInput = document.getElementById('search-dialog-input');
            const closeButton = document.getElementById('close-search');
            const searchResults = document.getElementById('search-results');
            const dialogContent = dialog.querySelector('div.search-dialog');

            // Open dialog with animation
            const openDialog = () => {
                // Store original body overflow and hide scrollbar
                this.originalBodyOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';

                dialog.classList.remove('hidden');
                dialog.classList.add('flex');

                // Trigger animation
                requestAnimationFrame(() => {
                    dialog.classList.remove('opacity-0');
                    dialog.classList.add('opacity-100');
                    dialogContent.classList.remove('scale-95', 'translate-y-4');
                    dialogContent.classList.add('scale-100', 'translate-y-0');
                });

                // Focus input after animation
                setTimeout(() => {
                    searchInput.focus();
                }, 150);
            };

            // Close dialog with animation
            const closeDialog = () => {
                // Start exit animation
                dialog.classList.remove('opacity-100');
                dialog.classList.add('opacity-0');
                dialogContent.classList.remove('scale-100', 'translate-y-0');
                dialogContent.classList.add('scale-95', 'translate-y-4');

                // Hide dialog after animation completes
                setTimeout(() => {
                    dialog.classList.add('hidden');
                    dialog.classList.remove('flex');

                    // Restore original body overflow
                    document.body.style.overflow = this.originalBodyOverflow || '';

                    // Reset form
                    searchInput.value = '';
                    searchResults.innerHTML = '<div class="text-sm text-muted-foreground text-center py-8">Start typing to search for books...</div>';
                }, 300);
            };

            // Event listeners
            searchButton?.addEventListener('click', openDialog);
            closeButton?.addEventListener('click', closeDialog);

            // Close on outside click
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) closeDialog();
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Ctrl+K or Cmd+K to open
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    openDialog();
                }
                // Escape to close
                if (e.key === 'Escape') {
                    closeDialog();
                }
            });

            // Search functionality
            searchInput?.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                const query = e.target.value.trim();

                if (!query) {
                    searchResults.innerHTML = '<div class="text-sm text-muted-foreground text-center py-8">Start typing to search for books...</div>';
                    return;
                }

                // Show loading state
                searchResults.innerHTML = '<div class="text-sm text-muted-foreground text-center py-8">Searching...</div>';

                // Debounce search with default options
                this.searchTimeout = setTimeout(() => {
                    this.performSearch(query, {
                        page: 1,
                        limit: 10,
                        sort: 'desc'
                        // category: 'ភាសាខ្មែរ' // Uncomment to filter by specific category
                    });
                }, 300);
            });

            // Handle Enter key
            searchInput?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = e.target.value.trim();
                    if (query) {
                        this.performSearch(query, {
                            page: 1,
                            limit: 10,
                            sort: 'desc'
                            // category: 'ភាសាខ្មែរ' // Uncomment to filter by specific category
                        });
                    }
                }
            });
        }, 100);
    }

    async performSearch(query, options = {}) {
        const searchResults = document.getElementById('search-results');

        try {
            // Show loading state
            searchResults.innerHTML = '<div class="text-sm text-muted-foreground text-center py-8">Searching...</div>';

            // Create URL with search parameters
            const searchUrl = new URL('/api/v1/ebooks', APP_API_URL);

            // Add search query
            if (query) {
                searchUrl.searchParams.set('search', query);
            }

            // Add category filter if specified
            if (options.category) {
                searchUrl.searchParams.set('category', options.category);
            }

            // Fetch data from API with search parameters
            const response = await fetch(searchUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Handle your specific API response format
            const results = data.result || [];
            const totalResults = data.total || 0;
            const currentPage = options.page || 1;
            const totalPages = Math.ceil(totalResults / (options.limit || 10));

            if (results.length === 0) {
                searchResults.innerHTML = `
                    <div class="text-sm text-muted-foreground text-center py-8">
                        No results found for "${query}"
                    </div>
                `;
                return;
            }

            // Create results HTML
            const resultsHTML = results.map(book => `
                <div class="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded cursor-pointer border-b border-border last:border-b-0" data-book-id="${book.id || ''}">
                    <div class="flex-shrink-0 w-10 h-10 bg-primary/10 rounded flex items-center justify-center overflow-hidden">
                        ${book.image
                    ? `<img src="${APP_API_URL}${book.image}?q=60&w=100" alt="${book.title}" class="w-full h-full object-cover rounded" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                                <svg class="size-5 text-primary hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                </svg>`
                    : `<svg class="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                </svg>`
                }
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-medium text-sm truncate">${book.title || 'Untitled'}</div>
                        <div class="text-xs text-muted-foreground">by ${book.author || 'Unknown Author'}</div>
                        <div class="text-xs text-muted-foreground flex items-center gap-2">
                            <span>${book.category || 'Uncategorized'}</span>
                            ${book.rating ? `<span class="flex items-center gap-1">⭐ ${parseFloat(book.rating).toFixed(1)}</span>` : ''}
                            ${book.price ? `<span>$${book.price}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');

            // Add pagination info and controls if needed
            const paginationHTML = totalPages > 1 ? `
                <div class="border-t border-border px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
                    <span>Page ${currentPage} of ${totalPages} (${totalResults} results)</span>
                    <div class="flex items-center gap-2">
                        ${currentPage > 1 ? `<button class="pagination-btn px-2 py-1 bg-foreground/10 rounded text-xs hover:bg-foreground/20" data-page="${currentPage - 1}">Previous</button>` : ''}
                        ${currentPage < totalPages ? `<button class="pagination-btn px-2 py-1 bg-foreground/10 rounded text-xs hover:bg-foreground/20" data-page="${currentPage + 1}">Next</button>` : ''}
                    </div>
                </div>
            ` : '';

            searchResults.innerHTML = resultsHTML + paginationHTML;

            // Add click event listeners to search results
            const resultItems = searchResults.querySelectorAll('[data-book-id]');
            resultItems.forEach(item => {
                item.addEventListener('click', () => {
                    const bookId = item.getAttribute('data-book-id');
                    this.handleBookSelection(bookId, results);
                });
            });

            // Add pagination event listeners
            const paginationBtns = searchResults.querySelectorAll('.pagination-btn');
            paginationBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const page = parseInt(btn.getAttribute('data-page'));
                    this.performSearch(query, { ...options, page });
                });
            });

            // Store current search options for pagination
            this.currentSearchOptions = { query, options };

        } catch (error) {
            console.error('Search error:', error);

            searchResults.innerHTML = `
                <div class="text-sm text-red-500 text-center py-8">
                    Error searching books. Please try again.
                </div>
            `;
        }
    }

    // Add this method to handle book selection
    handleBookSelection(bookId, books) {
        const selectedBook = books.find(book => book.id === bookId);
        if (selectedBook) {
            // Close the search dialog
            const dialog = document.getElementById('search-dialog');
            const searchInput = document.getElementById('search-dialog-input');
            const searchResults = document.getElementById('search-results');

            dialog.classList.add('hidden');
            dialog.classList.remove('flex');
            searchInput.value = '';

            // Restore body overflow
            document.body.style.overflow = this.originalBodyOverflow || '';

            // Reset search results
            searchResults.innerHTML = '<div class="text-sm text-muted-foreground text-center py-8">Start typing to search for books...</div>';

            // Handle book selection - you can customize this based on your needs
            console.log('Selected book:', selectedBook);

            // Example: Navigate to book details page
            // window.location.href = `/book/${selectedBook.id}`;

            // Example: Dispatch custom event
            document.dispatchEvent(new CustomEvent('bookSelected', {
                detail: selectedBook
            }));
        }
    }

    init() {
        this.setupSearchDialog();
    }
}