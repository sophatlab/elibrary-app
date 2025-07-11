import { APP_API_URL } from "../libs/constant.js";

export class DetailCard {

    constructor(book) {
        this.book = book;
    }

    static bookSection (book) {

        const currentBreadcrumb = document.querySelector('#current-collection');
        if (currentBreadcrumb) {
            currentBreadcrumb.textContent = book.title;
        }

        return `
            <div class="main w-full">
                <div class="flex max-md:flex-col items-start justify-start gap-6">

                    <div class="w-full border border-dashed border-border p-5">
                        <div class="pb-7">
                            <h1 class="text-3xl font-bold mb-2">${book.title}</h1>
                            <p class="text-gray-700 mb-4">${book.subtitle}</p>

                            <div class="flex items-center gap-4 mb-4">
                                <span class="text-sm text-gray-500">Author: <a href="#" class="text-primary hover:underline">${book.author}</a></span>
                                <span class="text-sm text-gray-500">Published: ${new Date(book.publication_date).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                            </div>
                        </div>

                        <div class="border rounded-2xl max-w-md mx-auto border-dashed border-border p-5 flex justify-between gap-5">
                            <div class="flex items-center gap-4">
                                <div class="flex items-center justify-center gap-0">
                                    <img src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/pdp-shared/components/LaurelItem/ic-system-gf-gold-left-laurel-32-3x.d074c7557225d2a0f3f1289a3dde7a7d.png" alt="Book Thumbnail" class="w-7 h-auto">
                                    <div>
                                        <h2 class="text-lg font-semibold text-center">Best</h2>
                                        <p class="text-sm text-center">Top Sales</p>
                                    </div>
                                    <img src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/pdp-shared/components/LaurelItem/ic-system-gf-gold-right-laurel-32-3x.f972b95c999d29e144d9ef970585906d.png" alt="Book Thumbnail" class="w-7 h-auto">
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div class="px-2">
                                    <h2 class="text-2xl font-semibold leading-5 text-center">${book.rating}</h2>
                                    <p class="text-sm text-center">
                                        <span class="text-yellow-500">★★★★★</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-5">
                            <h2 class="text-xl font-semibold mb-3">Description</h2>
                            <p class="text-gray-700 mb-4">
                                ${book.description || "No description available for this book."}
                            </p>

                            <h2 class="text-xl font-semibold mb-3">Table of Contents</h2>
                            <ul class="list-disc pl-5 text-gray-700">
                                <li>Introduction to Logic</li>
                                <li>Set Theory Basics</li>
                                <li>Combinatorial Analysis</li>
                                <li>Graph Theory Fundamentals</li>
                                <li>Applications in Computer Science</li>
                            </ul>
                        </div>

                    </div>

                    <div class="max-md:w-full w-80 flex flex-col gap-2 shrink-0 md:sticky top-5 max-md:order-first order-last h-auto">

                        <div class="flex border border-dashed border-border px-2 items-center justify-between">
                            <h2 class="text-xl font-semibold">Price</h2>
                            <p class="text-2xl font-bold text-green-600">$${book.price}</p>
                        </div>

                        <!-- Book thumbnail -->
                        <div class="border border-dashed border-border p-2">
                            <img src="${new URL(`/api/v1/files/thumbnails/${book.cover_image_url}?q=10&w=250`, APP_API_URL)}" alt="Book Thumbnail" class="w-full h-auto object-cover">
                        </div>

                        <div class=" border border-dashed border-border p-2 flex items-center justify-between">
                            <button type="button" class="button w-full button-primary">
                                $${book.price} Buy now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}