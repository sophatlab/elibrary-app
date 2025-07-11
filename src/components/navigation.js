import { cn } from '../libs/tailwind.js';
import { Icons } from './icons.js';
import { Search } from './search.js';

export class Navigation {
    constructor() {
        this.navigation = document.querySelector('.header');
        this.search = new Search();
        this.render();
        this.themeSwitch();
        this.search.init();
    }

    logo() {
        return (`
            <div class="logo">
                <a href="/" class="inline-flex items-center gap-2">
                    <svg class="size-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" >
                        <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                        <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                        <path d="M5 8h4" />
                        <path d="M9 16h4" />
                        <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
                        <path d="M14 9l4 -1" />
                        <path d="M16 16l3.923 -.98" />
                    </svg>
                </a>
                <span class="text-2xl">eBooks</span>
            </div>
        `)
    }

    theme() {
        const themeButton = document.createElement('button');
        themeButton.classList = "w-full cursor-pointer inline-flex text-xs gap-1 p-1 items-center bg-foreground/5 border border-border rounded-4xl";
        themeButton.setAttribute('type', 'button');
        themeButton.setAttribute('aria-label', 'Toggle Theme');
        themeButton.setAttribute('id', 'theme-toggle-button');
        themeButton.innerHTML = (`
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 11h2m-1 -1v2" />
            </svg>
        `);

        return (`<span class="sr-only">Theme</span> ${themeButton.outerHTML}`)
    }

    moonIcon() {
        return (`
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
            </svg>
        `)
    }

    sunIcon() {
        return (`
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 11h2m-1 -1v2" />
            </svg>
        `)
    }

    modules = [
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

    themeSwitch() {
        // Attach theme toggle event
        const themeButton = document.getElementById('theme-toggle-button');
        const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // compare with localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                themeButton.innerHTML = this.moonIcon();
            } else {
                document.documentElement.classList.remove('dark');
                themeButton.innerHTML = this.sunIcon();
            }
        } else {
            // If no saved theme, use system preference
            if (isDarkModePreferred) {
                document.documentElement.classList.add('dark');
                themeButton.innerHTML = this.moonIcon();
            } else {
                document.documentElement.classList.remove('dark');
                themeButton.innerHTML = this.sunIcon();
            }
        }


        if (themeButton) {
            themeButton.addEventListener('click', () => {
                // Toggle dark mode class
                document.documentElement.classList.toggle('dark');

                // Save theme preference in localStorage
                const isDarkMode = document.documentElement.classList.contains('dark');
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                themeButton.innerHTML = isDarkMode ? this.moonIcon() : this.sunIcon();
            });
        }
    }

    github() {
        return (`
            <span class="sr-only">Github</span>
            <a target="_blank" href="https://github.com/pphatdev">
                <svg viewBox="0 0 20 20" class="size-6 text-foreground" fill="currentColor">
                    <path d="M10 0C4.475 0 0 4.475 0 10a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0020 10c0-5.525-4.475-10-10-10z"></path>
                </svg>
            </a>`
        )
    }

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

    renderModule() {
        const container = document.createElement('ol')
        container.classList = "flex items-center p-4 gap-2";
        const sidebarContent = this.modules.map(item => {
            // Check if this item should be active based on current URL
            const isActive = this.isUrlActive(item.url);

            return (`
                <li>
                    <a class="${cn("group relative inline-flex w-full py-1 px-3 rounded-2xl justify-start items-center gap-3 font-medium hover:bg-primary/5 hover:text-primary", isActive ? "text-primary bg-primary/5 border border-primary/10 border-dashed" : "text-foreground/80")}"
                        aria-current="${isActive ? 'page' : 'false'}"
                        href="${new URL(item.url, window.location.origin)}">
                        ${item.icon}
                        ${item.title}
                    </a>
                </li>
            `)
        }).join('');

        container.innerHTML = sidebarContent;

        return container.outerHTML;
    }



    render() {
        if (!this.navigation) return;

        const navContent = `
            ${this.logo()}
            ${this.renderModule()}

            <nav class="sm:px-6 lg:px-8">
                <ul class="flex items-center justify-end gap-4" role="menubar">
                    <li role="menuitem">
                        ${this.search.createSearchButton()}
                    </li>
                    <li role="menuitem">
                        ${this.theme()}
                    </li>
                    <li role="menuitem">
                        ${this.github()}
                    </li>
                </ul>
            </nav>`
        this.navigation.innerHTML = navContent;
    }
}
