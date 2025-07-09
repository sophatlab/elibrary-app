import { initializeHero } from '../components/hero.js';
import { initializeLayout } from '../components/layout.js';
import { loadingCard } from '../components/loading.js';
import { APP_API_URL } from '../libs/constant.js';

const renderRecommendedBooks = async () => {

    const recommendedBooksContainer = document.getElementById('recommended-books');
    // set loading state
    recommendedBooksContainer.innerHTML = loadingCard({ length: 10 });
    const books = await fetch(new URL(`/api/v1/recommendations/trending`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching books:', error);
            return [];
        });

    recommendedBooksContainer.innerHTML = Array.from(books).map(book => `
        <li class="shrink-0 w-32 @sm:w-44 overflow-hidden rounded">
            <img src="${new URL(`/api/v1/files/thumbnails/${book.cover_image_url}?q=60&w=250`, APP_API_URL)}" alt="${book.title}" class="max-sm:h-36 border border-border/10 rounded-lg w-full object-cover aspect-[3/4]">
            <div>
                <h3 class="font-semibold">${book.title}</h3>
                <p class="text-xs">${book.author}</p>
            </div>
        </li>`
    ).join('');
};


const authors = [
    {
        id: 1,
        name: 'PPhat Author',
        image: 'https://github.com/pphatdev.png',
        followers: 10,
    },
]

const renderAuthors = () => {
    const authorsContainer = document.getElementById('authors');
    authorsContainer.innerHTML = authors.map(author => `
        <li class=" shrink-0">
            <a href="" class="flex flex-col items-center">
                <img src="${author.image}" alt="${author.name}" class="size-20 ring-2 ring-primary rounded-full mb-2">
                <h3 class="text-sm font-medium">${author.name}</h3>
                <span class="text-xs">${author.followers} followers</span>
            </a>
        </li>
    `).join('');
};


const renderNewReleaseBooks = async () => {

    const newReleaseBooksContainer = document.getElementById('new-release');
    newReleaseBooksContainer.innerHTML = loadingCard({ length: 10 });
    const books = await fetch(new URL(`/api/v1/ebooks`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching books:', error);
            return [];
        });
    newReleaseBooksContainer.innerHTML = books.map(book => `
        <li class="shrink-0 w-32 @sm:w-44 overflow-hidden rounded">
            <img src="${new URL(`${book.image}?q=60&w=250`, APP_API_URL)}" alt="${book.title}" class="max-sm:h-36 border border-border/10 rounded-lg w-full object-cover aspect-[3/4]">
            <div>
                <h3 class="font-semibold">${book.title}</h3>
                <p class="text-xs">${book.author}</p>
            </div>
        </li>
    `).join('');
};


document.addEventListener('DOMContentLoaded', () => {
    // Initialize layout
    initializeLayout()
    initializeHero();

    // Render recommended books
    renderRecommendedBooks()
    renderAuthors();
    renderNewReleaseBooks()
});
