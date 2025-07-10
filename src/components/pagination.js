export const createPagination = (currentPage, totalPages, onPageChange) => {
    if (totalPages <= 1) return '';

    const getPageNumbers = () => {
        const pages = [];
        const showPages = 5; // Show 5 page numbers at most

        if (totalPages <= showPages) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Complex pagination logic
            if (currentPage <= 3) {
                // Near the beginning
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // In the middle
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return `
        <nav class="flex max-xs:flex-col gap-2 items-center justify-between" aria-label="Pagination Navigation">
            <div class="pagination-info">
                <span class="text-sm">
                    Page ${currentPage} of ${totalPages}
                </span>
            </div>
            <div class="flex items-center justify-between gap-2">
                <button
                    class="button ${currentPage === 1 ? 'button-primary' : 'ring ring-primary text-primary hover:bg-primary hover:text-primary-foreground'}"
                    ${currentPage === 1 ? 'disabled' : ''}
                    data-page="${currentPage - 1}"
                    aria-label="Go to previous page"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                    <span class="max-sm:sr-only">Previous</span>
                </button>
                <div class="shrink-0 flex items-center gap-3">
                    ${pageNumbers.map(page => {
                        if (page === '...') {
                            return '<span class="pagination-ellipsis">...</span>';
                        }
                        return `<button
                                    class="button ${page === currentPage ? 'button-primary shrink-0 ring ring-primary' : 'ring ring-primary text-primary hover:bg-primary hover:text-primary-foreground'}"
                                    data-page="${page}"
                                    aria-label="Go to page ${page}"
                                    ${page === currentPage ? 'aria-current="page"' : ''}
                                >
                                    ${page}
                                </button>
                            `;
                    }).join('')}
                </div>

                <button
                    class="button ${currentPage === totalPages ? 'button-primary' : 'ring ring-primary text-primary hover:bg-primary hover:text-primary-foreground'}"
                    ${currentPage === totalPages ? 'disabled' : ''}
                    data-page="${currentPage + 1}"
                    aria-label="Go to next page"
                >
                    <span class="max-sm:sr-only">Next</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </button>
            </div>
        </nav>
    `;
};

export const initializePagination = (container, currentPage, totalPages, onPageChange) => {
    container.innerHTML = createPagination(currentPage, totalPages, onPageChange);

    // Add event listeners
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-page]');
        if (btn && !btn.disabled) {
            const page = parseInt(btn.dataset.page);
            onPageChange(page);
        }
    });
};