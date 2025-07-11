import { cn } from '../libs/tailwind.js';
import { Icons } from './icons.js';

export class MobileSidebar {
    constructor(navigationModules) {
        this.modules = navigationModules;
        this.isSidebarOpen = false;
        this.sidebar = null;
        this.overlay = null;
        this.init();
    }

    init() {
        this.createSidebar();
        this.setupEventListeners();
    }

    createSidebar() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'mobile-sidebar-overlay';
        this.overlay.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none';

        // Create sidebar
        this.sidebar = document.createElement('div');
        this.sidebar.id = 'mobile-sidebar';
        this.sidebar.className = 'fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out -translate-x-full';

        this.sidebar.innerHTML = `
            <div class="flex flex-col h-full overflow-y-auto">
                <!-- Sidebar Header -->
                <div class="flex items-center justify-between px-4 py-2 border-b border-border">
                    <div class="flex items-center gap-2">
                        <svg class="size-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                            <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                            <path d="M5 8h4" />
                            <path d="M9 16h4" />
                            <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
                            <path d="M14 9l4 -1" />
                            <path d="M16 16l3.923 -.98" />
                        </svg>
                        <span class="text-xl font-bold">eBooks</span>
                    </div>
                    <button type="button" class="p-2 hover:bg-foreground/5 rounded-lg transition-colors" id="close-mobile-sidebar">
                        <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Navigation Links -->
                <nav class="flex flex-col p-4 gap-2">
                    ${this.renderNavItems()}
                </nav>

                <!-- Sidebar Footer -->
                <div class="mt-auto p-4 border-t border-border">
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium">Theme</span>
                            <button type="button" class="p-2 hover:bg-foreground/5 rounded-lg transition-colors" id="mobile-theme-toggle">
                                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                                    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                                    <path d="M19 11h2m-1 -1v2" />
                                </svg>
                            </button>
                        </div>
                        <a href="https://github.com/pphatdev" target="_blank" class="flex items-center justify-between  py-2 pr-2 hover:text-primary transition-colors">
                            <span class="text-sm font-medium">GitHub</span>
                            <svg viewBox="0 0 20 20" class="size-5 text-foreground" fill="currentColor">
                                <path d="M10 0C4.475 0 0 4.475 0 10a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0020 10c0-5.525-4.475-10-10-10z"></path>
                            </svg>
                        </a>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium">Search</span>
                            <button type="button" class="p-2 hover:bg-foreground/5 rounded-lg transition-colors" id="mobile-search-toggle">
                                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);
        document.body.appendChild(this.sidebar);
    }

    renderNavItems() {
        return this.modules.map(item => {
            const isActive = this.isUrlActive(item.url);
            return `
                <a href="${new URL(item.url, window.location.origin)}"
                    class="${cn("group relative inline-flex w-full py-2 px-3 rounded-2xl justify-start items-center gap-3 font-medium hover:bg-primary/5 hover:text-primary", isActive ? "text-primary bg-primary/5 border border-primary/10 border-dashed" : "text-foreground/80")}"
                    aria-current="${isActive ? 'page' : 'false'}">
                    ${item.icon}
                    <span>${item.title}</span>
                </a>
            `;
        }).join('');
    }

    isUrlActive(itemUrl) {
        const currentPath = window.location.pathname;
        const itemPath = new URL(itemUrl, window.location.origin).pathname;

        if (itemPath === '/' && currentPath === '/') {
            return true;
        }

        if (itemPath !== '/' && currentPath.startsWith(itemPath)) {
            return true;
        }

        return false;
    }

    setupEventListeners() {
        // Open sidebar when burger menu is clicked
        const burgerMenu = document.getElementById('burger-menu');
        burgerMenu?.addEventListener('click', () => this.openSidebar());

        // Close sidebar when close button is clicked
        const closeButton = document.getElementById('close-mobile-sidebar');
        closeButton?.addEventListener('click', () => this.closeSidebar());

        // Close sidebar when overlay is clicked
        this.overlay?.addEventListener('click', () => this.closeSidebar());

        // Theme toggle in mobile sidebar
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        mobileThemeToggle?.addEventListener('click', () => {
            const themeButton = document.getElementById('theme-toggle-button');
            if (themeButton) {
                themeButton.click();
                this.updateMobileThemeIcon();
            }
        });

        // Search toggle in mobile sidebar
        const mobileSearchToggle = document.getElementById('mobile-search-toggle');
        mobileSearchToggle?.addEventListener('click', () => {
            const searchButton = document.getElementById('search-button');
            if (searchButton) {
                searchButton.click();
                this.closeSidebar();
            }
        });

        // Close sidebar when clicking navigation links
        this.sidebar?.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', () => {
                this.closeSidebar();
            });
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isSidebarOpen) {
                this.closeSidebar();
            }
        });

        // Update mobile theme icon when theme changes
        this.updateMobileThemeIcon();
    }

    openSidebar() {
        this.isSidebarOpen = true;

        // Show overlay
        this.overlay.classList.remove('opacity-0', 'pointer-events-none');
        this.overlay.classList.add('opacity-100', 'pointer-events-auto');

        // Show sidebar
        this.sidebar.classList.remove('-translate-x-full');
        this.sidebar.classList.add('translate-x-0');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        this.isSidebarOpen = false;

        // Hide overlay
        this.overlay.classList.remove('opacity-100', 'pointer-events-auto');
        this.overlay.classList.add('opacity-0', 'pointer-events-none');

        // Hide sidebar
        this.sidebar.classList.remove('translate-x-0');
        this.sidebar.classList.add('-translate-x-full');

        // Restore body scroll
        document.body.style.overflow = '';
    }

    updateMobileThemeIcon() {
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (mobileThemeToggle) {
            const isDarkMode = document.documentElement.classList.contains('dark');
            mobileThemeToggle.innerHTML = isDarkMode ? Icons.moon() : Icons.sun();
        }
    }
}