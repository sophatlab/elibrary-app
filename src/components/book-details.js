// Book details component
export function initializeBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    // Sample book data
    const sampleBooks = {
        1: {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            rating: 4.5,
            pages: 180,
            cover: "https://via.placeholder.com/400x600/4F46E5/FFFFFF?text=The+Great+Gatsby",
            description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the story of Jay Gatsby, a mysterious millionaire who throws lavish parties at his mansion in hopes of winning back his lost love, Daisy Buchanan.",
            isbn: "978-0-7432-7356-5",
            publishDate: "April 10, 1925",
            publisher: "Charles Scribner's Sons",
            language: "English",
            status: "Available"
        },
        2: {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            rating: 4.8,
            pages: 324,
            cover: "https://via.placeholder.com/400x600/059669/FFFFFF?text=To+Kill+a+Mockingbird",
            description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was ten.",
            isbn: "978-0-06-112008-4",
            publishDate: "July 11, 1960",
            publisher: "J. B. Lippincott & Co.",
            language: "English",
            status: "Available"
        }
    };

    function renderBookDetails(book) {
        if (!book) {
            document.getElementById('book-details').innerHTML = '<p class="text-center text-gray-500 py-8">Book not found</p>';
            return;
        }

        document.getElementById('book-cover').src = book.cover;
        document.getElementById('book-cover').alt = book.title;
        document.getElementById('book-genre').textContent = book.genre;
        document.getElementById('book-status').textContent = book.status;
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-author').textContent = book.author;
        document.getElementById('book-rating').textContent = book.rating;
        document.getElementById('book-pages').textContent = `${book.pages} pages`;
        document.getElementById('book-description').textContent = book.description;
        document.getElementById('book-isbn').textContent = book.isbn;
        document.getElementById('book-publish-date').textContent = book.publishDate;
        document.getElementById('book-publisher').textContent = book.publisher;
        document.getElementById('book-language').textContent = book.language;

        // Set status color
        const statusElement = document.getElementById('book-status');
        if (book.status === 'Available') {
            statusElement.classList.add('bg-green-100', 'text-green-800');
        } else {
            statusElement.classList.add('bg-red-100', 'text-red-800');
        }
    }

    function renderRelatedBooks() {
        const relatedBooks = [
            {
                id: 3,
                title: "1984",
                author: "George Orwell",
                cover: "https://via.placeholder.com/200x300/DC2626/FFFFFF?text=1984"
            },
            {
                id: 4,
                title: "Pride and Prejudice",
                author: "Jane Austen",
                cover: "https://via.placeholder.com/200x300/7C2D12/FFFFFF?text=Pride+and+Prejudice"
            },
            {
                id: 5,
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                cover: "https://via.placeholder.com/200x300/1F2937/FFFFFF?text=The+Catcher+in+the+Rye"
            },
            {
                id: 6,
                title: "Lord of the Flies",
                author: "William Golding",
                cover: "https://via.placeholder.com/200x300/B91C1C/FFFFFF?text=Lord+of+the+Flies"
            }
        ];

        const relatedBooksHTML = relatedBooks.map(book => `
      <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h4 class="font-semibold text-gray-900 mb-1 line-clamp-2">${book.title}</h4>
          <p class="text-gray-600 text-sm mb-2">${book.author}</p>
          <button onclick="window.location.href='/book.html?id=${book.id}'" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm">
            View Details
          </button>
        </div>
      </div>
    `).join('');

        document.getElementById('related-books').innerHTML = relatedBooksHTML;
    }

    // Event listeners
    document.getElementById('read-book-btn').addEventListener('click', () => {
        alert('Reading functionality would be implemented here!');
    });

    document.getElementById('add-to-favorites-btn').addEventListener('click', () => {
        alert('Added to favorites!');
    });

    // Load book details
    const book = sampleBooks[bookId];
    renderBookDetails(book);
    renderRelatedBooks();
}
