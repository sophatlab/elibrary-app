import { Cards } from '../components/cards.js';
import { initializeHero } from '../components/hero.js';
import { initializeLayout } from '../components/layout.js';
import { APP_API_URL } from '../libs/constant.js';

const renderRecommendedBooks = async () => {

    const recommendedBooksContainer = document.getElementById('recommended-books');
    // set loading state
    recommendedBooksContainer.innerHTML = Cards.skeleton({ length: 10 });
    const books = await fetch(new URL(`/api/v1/recommendations/trending`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching books:', error);
            return [];
        });

    recommendedBooksContainer.innerHTML = Array.from(books).map(Cards.recommendedBook).join('');
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
    newReleaseBooksContainer.innerHTML = Cards.skeleton({ length: 10 });
    const books = await fetch(new URL(`/api/v1/ebooks`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching books:', error);
            return [];
        });
    newReleaseBooksContainer.innerHTML = books.map(Cards.book).join('');
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
