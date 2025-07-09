// Catalog component
export function initializeCatalog() {
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('genre-filter');
    const searchBtn = document.getElementById('search-btn');
    const booksGrid = document.getElementById('books-grid');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');

    // Sample books data
    const sampleBooks = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "fiction",
            rating: 4.5,
            cover: "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=The+Great+Gatsby",
            description: "A classic American novel set in the summer of 1922..."
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "fiction",
            rating: 4.8,
            cover: "https://via.placeholder.com/300x400/059669/FFFFFF?text=To+Kill+a+Mockingbird",
            description: "A gripping tale of racial injustice and loss of innocence..."
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            genre: "fiction",
            rating: 4.7,
            cover: "https://via.placeholder.com/300x400/DC2626/FFFFFF?text=1984",
            description: "A dystopian social science fiction novel..."
        },
        {
            id: 4,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "fiction",
            rating: 4.6,
            cover: "https://via.placeholder.com/300x400/7C2D12/FFFFFF?text=Pride+and+Prejudice",
            description: "A romantic novel of manners..."
        },
        {
            id: 5,
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            genre: "fiction",
            rating: 4.3,
            cover: "https://via.placeholder.com/300x400/1F2937/FFFFFF?text=The+Catcher+in+the+Rye",
            description: "A controversial novel about teenage rebellion..."
        },
        {
            id: 6,
            title: "A Brief History of Time",
            author: "Stephen Hawking",
            genre: "science",
            rating: 4.4,
            cover: "https://via.placeholder.com/300x400/1E40AF/FFFFFF?text=A+Brief+History+of+Time",
            description: "A landmark volume in science writing..."
        }
    ];

    let filteredBooks = [...sampleBooks];

    function renderBooks(books) {
        loading.classList.add('hidden');

        if (books.length === 0) {
            booksGrid.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');

        const booksHTML = books.map(book => `
      <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">${book.title}</h3>
          <p class="text-gray-600 mb-2">${book.author}</p>
          <div class="flex items-center justify-between">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              ${book.genre}
            </span>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="ml-1 text-sm text-gray-600">${book.rating}</span>
            </div>
          </div>
          <button onclick="viewBook(${book.id})" class="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            View Details
          </button>
        </div>
      </div>
    `).join('');

        booksGrid.innerHTML = booksHTML;
    }

    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;

        filteredBooks = sampleBooks.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm);
            const matchesGenre = !selectedGenre || book.genre === selectedGenre;

            return matchesSearch && matchesGenre;
        });

        renderBooks(filteredBooks);
    }

    // Event listeners
    searchBtn.addEventListener('click', filterBooks);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterBooks();
        }
    });
    genreFilter.addEventListener('change', filterBooks);

    // Make viewBook function global
    window.viewBook = function (bookId) {
        window.location.href = `/book.html?id=${bookId}`;
    };

    // Initial render
    setTimeout(() => {
        renderBooks(sampleBooks);
    }, 1000);
}
