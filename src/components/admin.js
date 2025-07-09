// Admin component
export function initializeAdmin() {
    // Sample books data
    const sampleBooks = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            status: "available"
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            status: "available"
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            genre: "Fiction",
            status: "checked-out"
        },
        {
            id: 4,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Fiction",
            status: "available"
        },
        {
            id: 5,
            title: "A Brief History of Time",
            author: "Stephen Hawking",
            genre: "Science",
            status: "maintenance"
        }
    ];

    let books = [...sampleBooks];

    function updateStats() {
        const totalBooks = books.length;
        const availableBooks = books.filter(book => book.status === 'available').length;
        const checkedOutBooks = books.filter(book => book.status === 'checked-out').length;

        document.getElementById('total-books').textContent = totalBooks;
        document.getElementById('available-books').textContent = availableBooks;
        document.getElementById('checked-out-books').textContent = checkedOutBooks;
    }

    function renderBooksTable(booksToRender = books) {
        const tbody = document.getElementById('books-table-body');

        if (booksToRender.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">No books found</td></tr>';
            return;
        }

        const booksHTML = booksToRender.map(book => `
      <tr class="border-b border-gray-200">
        <td class="py-3 px-4">${book.title}</td>
        <td class="py-3 px-4">${book.author}</td>
        <td class="py-3 px-4">${book.genre}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-1 text-xs rounded-full ${getStatusColor(book.status)}">
            ${book.status.replace('-', ' ')}
          </span>
        </td>
        <td class="py-3 px-4">
          <div class="flex space-x-2">
            <button onclick="editBook(${book.id})" class="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
            <button onclick="deleteBook(${book.id})" class="text-red-600 hover:text-red-800 text-sm">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');

        tbody.innerHTML = booksHTML;
    }

    function getStatusColor(status) {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'checked-out':
                return 'bg-yellow-100 text-yellow-800';
            case 'maintenance':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    function filterBooks() {
        const searchTerm = document.getElementById('admin-search').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;

        const filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || book.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        renderBooksTable(filteredBooks);
    }

    function showAddBookModal() {
        document.getElementById('add-book-modal').classList.remove('hidden');
    }

    function hideAddBookModal() {
        document.getElementById('add-book-modal').classList.add('hidden');
        document.getElementById('add-book-form').reset();
    }

    function addBook(bookData) {
        const newBook = {
            id: Math.max(...books.map(b => b.id)) + 1,
            title: bookData.title,
            author: bookData.author,
            genre: bookData.genre,
            status: 'available'
        };

        books.push(newBook);
        updateStats();
        renderBooksTable();
        hideAddBookModal();
        alert('Book added successfully!');
    }

    // Make functions global for onclick handlers
    window.editBook = function (bookId) {
        alert(`Edit book ${bookId} functionality would be implemented here!`);
    };

    window.deleteBook = function (bookId) {
        if (confirm('Are you sure you want to delete this book?')) {
            books = books.filter(book => book.id !== bookId);
            updateStats();
            renderBooksTable();
            alert('Book deleted successfully!');
        }
    };

    // Event listeners
    document.getElementById('add-book-btn').addEventListener('click', showAddBookModal);
    document.getElementById('cancel-add-book').addEventListener('click', hideAddBookModal);

    document.getElementById('import-books-btn').addEventListener('click', () => {
        alert('Import books functionality would be implemented here!');
    });

    document.getElementById('export-catalog-btn').addEventListener('click', () => {
        alert('Export catalog functionality would be implemented here!');
    });

    document.getElementById('backup-data-btn').addEventListener('click', () => {
        alert('Backup data functionality would be implemented here!');
    });

    document.getElementById('admin-search').addEventListener('input', filterBooks);
    document.getElementById('status-filter').addEventListener('change', filterBooks);

    document.getElementById('add-book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bookData = {
            title: document.getElementById('book-title-input').value,
            author: document.getElementById('book-author-input').value,
            genre: document.getElementById('book-genre-input').value,
            isbn: document.getElementById('book-isbn-input').value
        };
        addBook(bookData);
    });

    // Click outside modal to close
    document.getElementById('add-book-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('add-book-modal')) {
            hideAddBookModal();
        }
    });

    // Initial setup
    updateStats();
    renderBooksTable();
}
