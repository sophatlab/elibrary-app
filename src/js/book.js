import { initializeLayout } from '../components/layout.js';
import { APP_API_URL } from '../libs/constant.js';

const bookInitial = async () => {

    // get the id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    // validate bookId must be uuid format
    if (!bookId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(bookId)) {
        console.error('Invalid book ID:', bookId);
        return;
    }


    const book = await fetch(new URL(`/api/v1/ebooks/${bookId}`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching book:', error);
            return {};
        });

    const bookDetail = document.getElementById('book-detail');

    if (book && book.id) {
        bookDetail.innerHTML = `
            <div class="container mx-auto px-4 py-8 max-w-7xl">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Book Cover and Actions -->
                    <div class="lg:col-span-1">
                        <div class="sticky top-8">
                            <!-- Book Cover -->
                            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div class="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                                    <img src="${new URL(`/api/v1/files/thumbnails/${book.cover_image_url}?q=60&w=512`, APP_API_URL)}"
                                        alt="${book.title || 'Book cover'}"
                                        class="w-full rounded-lg object-cover transition-opacity duration-300 opacity-0"
                                        onload="this.classList.remove('opacity-0')">
                                </div>
                                <!-- Price and Rating -->
                                <div class="flex items-center justify-between mb-4">
                                    <div class="text-3xl font-bold ${book.price && parseFloat(book.price) > 0 ? 'text-green-600' : 'text-green-600'}">
                                        ${book.price && parseFloat(book.price) > 0 ? `$${book.price}` : 'Free'}
                                    </div>
                                    <div class="flex items-center">
                                        <div class="flex text-yellow-400">
                                            ${generateStars(book.rating || 0)}
                                        </div>
                                        <span class="ml-2 text-sm text-gray-600">${book.rating || 0}</span>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="space-y-3">
                                    <button onclick="downloadBook('${book.id}')" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                                        <i class="fas fa-download mr-2"></i>Download
                                    </button>
                                    <button onclick="addToFavorites('${book.id}')" class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition duration-200">
                                        <i class="fas fa-heart mr-2"></i>Add to Wishlist
                                    </button>
                                    ${book.price && parseFloat(book.price) > 0 ?
                `<button onclick="purchaseBook('${book.id}')" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200">
                                            <i class="fas fa-shopping-cart mr-2"></i>Buy Now
                                        </button>` :
                `<button class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200">
                                            <i class="fas fa-download mr-2"></i>Download Sample
                                        </button>`
            }
                                </div>
                            </div>

                            <!-- Book Stats -->
                            <div class="bg-white rounded-lg shadow-md p-6">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Book Statistics</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Downloads</span>
                                        <span class="font-semibold">${book.download_count || 0}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Pages</span>
                                        <span class="font-semibold">${book.page_count || 'Unknown'}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">File Size</span>
                                        <span class="font-semibold">${book.file_size_mb || 'Unknown'} MB</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Format</span>
                                        <span class="font-semibold uppercase">${book.file_format || 'Unknown'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Book Information -->
                    <div class="lg:col-span-2">
                        <!-- Title and Author -->
                        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div class="mb-4">
                                <span class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3">${book.category || 'Uncategorized'}</span>
                                <h1 class="text-3xl font-bold text-gray-900 mb-2">${book.title || 'Unknown Title'}</h1>
                                ${book.subtitle ? `<p class="text-xl text-gray-600 mb-4">${book.subtitle}</p>` : ''}
                                <div class="flex items-center text-gray-600">
                                    <span class="mr-2">by</span>
                                    <span class="font-semibold">${book.author || 'Unknown Author'}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                            <p class="text-gray-700 leading-relaxed">
                                ${book.description || 'No description available.'}
                            </p>
                        </div>

                        <!-- Book Details -->
                        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Book Details</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-3">
                                    <div>
                                        <span class="text-gray-600 font-medium">ISBN:</span>
                                        <span class="ml-2">${book.isbn || 'Not available'}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600 font-medium">Publisher:</span>
                                        <span class="ml-2">${book.publisher || 'Unknown Publisher'}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600 font-medium">Publication Date:</span>
                                        <span class="ml-2">${book.publication_date ? new Date(book.publication_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600 font-medium">Language:</span>
                                        <span class="ml-2">${book.language || 'Not specified'}</span>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div>
                                        <span class="text-gray-600 font-medium">Pages:</span>
                                        <span class="ml-2">${book.page_count || 'Unknown'}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600 font-medium">File Format:</span>
                                        <span class="ml-2 uppercase">${book.file_format || 'Unknown'}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600 font-medium">File Size:</span>
                                        <span class="ml-2">${book.file_size_mb || 'Unknown'} MB</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600 font-medium">Status:</span>
                                        <span class="ml-2">
                                            <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">Available</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Information -->
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                            <div class="space-y-3">
                                <div>
                                    <span class="text-gray-600 font-medium">Created Date:</span>
                                    <span class="ml-2">${book.created_at ? new Date(book.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not available'}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600 font-medium">Last Updated:</span>
                                    <span class="ml-2">${book.updated_at ? new Date(book.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not available'}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600 font-medium">Book ID:</span>
                                    <span class="ml-2 text-sm font-mono">${book.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        bookDetail.innerHTML = `
            <div class="container mx-auto px-4 py-8 max-w-4xl">
                <div class="flex justify-center">
                    <div class="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
                        <div class="text-red-500 mb-4">
                            <i class="fas fa-exclamation-triangle text-4xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
                        <p class="text-gray-600 mb-6">The requested book could not be found or loaded. Please check the URL and try again.</p>
                        <a href="/" class="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                            Go Back to Library
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Helper function to generate star ratings
function generateStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push('<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>');
    }

    if (hasHalfStar) {
        stars.push('<svg class="w-5 h-5 fill-current opacity-50" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>');
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars.push('<svg class="w-5 h-5 fill-current opacity-25" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>');
    }

    return stars.join('');
}

// Action functions
function downloadBook(bookId) {
    console.log('Downloading book:', bookId);
    // Implement download functionality
    alert('Download functionality will be implemented here');
}

function addToFavorites(bookId) {
    console.log('Adding to favorites:', bookId);
    // Implement add to favorites functionality
    alert('Add to favorites functionality will be implemented here');
}

function purchaseBook(bookId) {
    console.log('Purchasing book:', bookId);
    // Implement purchase functionality
    alert('Purchase functionality will be implemented here');
}

document.addEventListener('DOMContentLoaded', async () => {
    initializeLayout()

    await bookInitial();
});
