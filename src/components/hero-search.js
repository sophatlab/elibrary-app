export default function heroInitalized(callback = () => { }) {

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
                callback(currentPage);
            }, 500);
        });
    }
}
