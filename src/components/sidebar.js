import { cn } from "../libs/tailwind.js";

const data = [
    {
        id: 1,
        title: "Home",
        isActive: true,
        url: "/",
        icon: (
            `<svg viewBox="0 0 24 24" fill="currentColor" class="size-5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
            </svg>`
        )
    },
    {
        id: 2,
        title: "Collection",
        isActive: false,
        url: "catalog.html",
        icon: (
            `<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M5 8h4" />
                <path d="M9 16h4" />
                <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
                <path d="M14 9l4 -1" />
                <path d="M16 16l3.923 -.98" />
            </svg>`
        )
    },
    {
        id: 3,
        title: "Helps",
        isActive: false,
        url: "/help",
        icon: (
            `<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M12 9h.01" />
                <path d="M11 12h1v4h1" />
            </svg>`
        )
    },
]

export class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.render();
    }

    // Add method to check if URL is active
    isUrlActive(itemUrl) {
        const currentPath = window.location.pathname;
        const itemPath = new URL(itemUrl, window.location.origin).pathname;

        // Exact match for home page
        if (itemPath === '/' && currentPath === '/') {
            return true;
        }

        // For other pages, check if current path starts with item path
        if (itemPath !== '/' && currentPath.startsWith(itemPath)) {
            return true;
        }

        return false;
    }

    render() {
        if (!this.sidebar) return;

        const container = document.createElement('ol')
        container.classList = "flex flex-col gap-0 p-4";
        const sidebarContent = data.map(item => {
            // Check if this item should be active based on current URL
            const isActive = this.isUrlActive(item.url);

            return `
                <li>
                    <a class="${cn(
                "group relative inline-flex w-full p-2 pl-3 rounded-full rounded-l-none justify-start items-center gap-3 font-medium hover:bg-primary/5 hover:text-primary",
                isActive
                    ? "text-primary bg-primary/5 border border-primary/10 border-dashed"
                    : "text-foreground/80"
            )}"
                        aria-current="${isActive ? 'page' : 'false'}"
                        href="${new URL(item.url, window.location.origin)}"
                    >
                        ${isActive
                    ? `<div class="absolute left-0 h-full w-1 bg-primary rounded-full"></div>`
                    : ``
                }
                    
                        ${item.icon}
                        ${item.title}
                    </a>
                </li>
            `
        }).join('');

        container.innerHTML = sidebarContent;
        this.sidebar.innerHTML = container.outerHTML;
    }
}