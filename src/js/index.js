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


const renderAuthors = async () => {
    const authorsContainer = document.getElementById('authors');
    const authors = await fetch(new URL(`/api/v1/authors`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching books:', error);
            return [];
        });

    authorsContainer.innerHTML = authors.map(Cards.author).join('');
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
