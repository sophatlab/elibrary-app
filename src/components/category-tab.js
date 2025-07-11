export class CategoryTab {
    constructor() {
        this.categories = [
            { name: 'All', isActive: true, url: '?category=All' },
            { name: 'Recommendations', isActive: false, url: '?category=Recommendations' },
            { name: 'ភាសាខ្មែរ', isActive: false, url: '?category=ភាសាខ្មែរ' },
            { name: 'គណិតវិទ្យា', isActive: false, url: '?category=គណិតវិទ្យា' }
        ];
    }

    initialize() {
        const categoryContainer = document.getElementById('category-tab');
        categoryContainer.innerHTML = this.categories.map(category => {
            // Get current URL parameters to preserve search terms
            const urlParams = new URLSearchParams(window.location.search);
            const currentCategory = urlParams.get('category');

            const searchObject = Object.fromEntries(urlParams.entries());
            const itemObject = Object.fromEntries(new URLSearchParams(category.url).entries());
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
    }
}

// Initialize the category tab component
export function initializeCategoryTab() {
    const categoryTab = new CategoryTab();
    categoryTab.initialize();
}