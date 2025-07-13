import heroInitalized from '../components/hero-search.js';
import { Icons } from '../components/icons.js';
import { initializeLayout } from '../components/layout.js';
import { APP_API_URL } from '../libs/constant.js';


const initializeAuthors = async () => {
    const authorsContainer = document.getElementById('authors');

    const authors = await fetch(new URL(`/api/v1/authors`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching authors:', error);
            return [];
        });

    authorsContainer.innerHTML = authors.map(author => `
        <li class="rounded-2xl border shadow-primary/20 border-dashed transition-all border-border bg-card hover:shadow-2xl p-6 w-full relative">
            <img src="${new URL(`/api/v1/files/authors/${author.image}?q=60&w=100`, APP_API_URL)}" alt="Author Avatar" class="size-20 rounded-full mb-5">
            <div class="w-full mt-5">
                <h2 class="font-semibold text-xl"> ${author.name} </h2>
                <p class="text-sm mt-2 text-foreground/60"> ${author.books_count} Books </p>
                <p class="text-sm mt-2"> ${author.biography} </p>
            </div>
            <div class="flex text-sm w-full font-medium gap-0 text-foreground/50 items-center mt-5 mb-2">
                <a href="${author.website}" class="flex items-center justify-center">
                    ${Icons.glob("size-6")}
                </a>
            </div>
            <a href="${new URL(`authors/profile?id=${author.id}?name=${author.name}`, location.origin)}" class="button button-primary px-4 absolute top-6 right-6">
                View
            </a>
        </li>
    `).join('');
}


document.addEventListener('DOMContentLoaded', async () => {
    // Initialize layout
    initializeLayout();

    heroInitalized((currentPage)=> {
        initializeAuthors(currentPage);
    })


    // Get initial page from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;

    await initializeAuthors(initialPage);
});
