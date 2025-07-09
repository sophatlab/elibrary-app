import { initializeHero } from '../components/hero.js';
import { initializeLayout } from '../components/layout.js';
import { loadingCard } from '../components/loading.js';
import { APP_API_URL } from '../libs/constant.js';

const renderRecommendedBooks = async () => {

    const recommendedBooksContainer = document.getElementById('recommended-books');
    // set loading state
    recommendedBooksContainer.innerHTML = loadingCard({ length: 10 });

    const books = await fetch(new URL(`/api/v1/ebooks`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching books:', error);
            return [];
        });

    recommendedBooksContainer.innerHTML = Array.from(books).map(book => `
        <li class="bg-card border shrink-0 w-32 @sm:w-44 overflow-hidden border-border/5 rounded">
            <img src="${new URL(book.image, APP_API_URL)}" alt="${book.title}" class="max-sm:h-36 w-full object-cover aspect-[3/4]">
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
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 2,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 1,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 2,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 1,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 2,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 1,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 2,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 1,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
    {
        id: 2,
        name: 'Author 1',
        image: 'https://picsum.photos/200/300?random=1',
        followers: 10,
    },
]

const renderAuthors = () => {
    const authorsContainer = document.getElementById('authors');
    authorsContainer.innerHTML = authors.map(author => `
        <li>
            <a href="" class="flex flex-col items-center">
                <img src="${author.image}" alt="${author.name}" class="size-20 ring-2 ring-primary rounded-full mb-2">
                <h3 class="text-sm font-medium">${author.name}</h3>
                <span class="text-xs">${author.followers} followers</span>
            </a>
        </li>
    `).join('');
};


const newReleaseBooks = [
    {
        id: 1,
        title: 'New Release Book',
        authors: [
            'Author One',
            'Author Two',
        ],
        image: 'https://picsum.photos/200/300?random=1',
    },
    {
        id: 2,
        title: 'Another New Release',
        authors: [
            'Author Three',
            'Author Four',
        ],
        image: 'https://picsum.photos/200/300?random=2',
    }
]

const renderNewReleaseBooks = () => {
    const newReleaseBooksContainer = document.getElementById('new-release');
    newReleaseBooksContainer.innerHTML = newReleaseBooks.map(book => `
        <li>
            <a href="">
                <img src="${book.image}" alt="${book.title}" class="w-40 h-60 object-cover rounded-lg shadow-md">
                <h3 class="mt-2 text-sm font-medium text-gray-900">${book.title}</h3>
            </a>
        </li>
    `).join('');
};


document.addEventListener('DOMContentLoaded', () => {
    // Initialize layout
    initializeLayout()


    initializeHero();

    // Render recommended books
    renderRecommendedBooks()

    // Render authors
    renderAuthors();

    renderNewReleaseBooks()

});
