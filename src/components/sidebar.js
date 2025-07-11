import { cn } from "../libs/tailwind.js";
import { Icons } from "./icons.js";

export class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.render();
    }

    // Static data for sidebar items
    static getData = [
        {
            id: 1,
            title: "Home",
            isActive: true,
            url: "/",
            icon: Icons.home()
        },
        {
            id: 2,
            title: "Collection",
            isActive: false,
            url: "collection",
            icon: Icons.collection()
        },
        {
            id: 3,
            title: "Helps",
            isActive: false,
            url: "/help",
            icon: Icons.help()
        },
    ]

    // Add method to check if URL is active
    isUrlActive(itemUrl) {
        const currentPath = window.location.pathname;
        const itemPath = new URL(itemUrl, window.location.origin).pathname;

        if (itemPath === '/' && currentPath === '/') {
            return true;
        }

        // For other pages, check if current path starts with item path
        if (itemPath !== '/' && currentPath.startsWith(itemPath)) {
            return true;
        }

        return false;
    }

    // Method to render the sidebar
    render() {
        if (!this.sidebar) return;

        const container = document.createElement('ol')
        container.classList = "flex flex-col gap-0 p-4";
        const sidebarContent = Sidebar.getData.map(item => {
            // Check if this item should be active based on current URL
            const isActive = this.isUrlActive(item.url);

            return (`
                <li>
                    <a class="${cn("group relative inline-flex w-full p-2 pl-3 rounded-full rounded-l-none justify-start items-center gap-3 font-medium hover:bg-primary/5 hover:text-primary", isActive ? "text-primary bg-primary/5 border border-primary/10 border-dashed" : "text-foreground/80")}"
                        aria-current="${isActive ? 'page' : 'false'}"
                        href="${new URL(item.url, window.location.origin)}">
                        ${isActive ? `<div class="absolute left-0 h-full w-1 bg-primary rounded-full"></div>` : ``}
                        ${item.icon}
                        ${item.title}
                    </a>
                </li>
            `)
        }).join('');

        container.innerHTML = sidebarContent;
        this.sidebar.innerHTML = container.outerHTML;
    }
}