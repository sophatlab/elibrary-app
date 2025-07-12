import { APP_API_URL } from "../libs/constant.js";
import { Icons } from "./icons.js";

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
                <div class="flex max-lg:flex-col items-start justify-start gap-6">

                    <div class="w-full border border-dashed rounded-2xl border-border p-5 relative">

                        <button class="button button-primary absolute px-2 right-5 top-5" onclick="navigator.share({
                            title: '${book.title}',
                            text: 'Check out this book: ${book.title}',
                            url: window.location.href
                        })">
                            ${Icons.share()}
                        </button>

                        <div class="pb-5">
                            <h1 class="text-3xl font-bold mb-2">${book.title}</h1>
                            <p class="text-foreground/80 mb-4">${book.subtitle}</p>
                        </div>

                        <div class="border rounded-2xl max-w-md mx-auto mt-5 border-dashed border-border p-5 flex justify-between gap-5">
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
                            <p class="text-foreground/80 mb-4">
                                ${book.description || "No description available for this book."}
                            </p>

                            <h2 class="text-xl font-semibold mb-3">Table of Contents</h2>
                            <ul class="list-disc pl-5 text-foreground/80">
                                <li>Introduction to Logic</li>
                                <li>Set Theory Basics</li>
                                <li>Combinatorial Analysis</li>
                                <li>Graph Theory Fundamentals</li>
                                <li>Applications in Computer Science</li>
                            </ul>
                        </div>

                    </div>

                    <div class="max-lg:w-full w-80 flex flex-col gap-2 shrink-0 lg:sticky top-5 max-lg:order-first order-last h-auto">

                        <div class="border border-dashed min-h-72 rounded-2xl border-border p-2">
                            <img src="${new URL(`/api/v1/files/thumbnails/${book.cover_image_url}?q=10&w=250`, APP_API_URL)}" alt="Book Thumbnail" class="max-lg:h-96 rounded-xl bg-foreground/5 max-lg:w-auto mx-auto w-full h-auto lg:object-cover">
                        </div>

                        <div class=" border border-dashed border-border p-2 rounded-full flex items-center justify-between">
                            <button type="button" class="button max-lg:w-fit mx-auto w-full button-primary">
                                $${book.price} Buy now
                            </button>
                        </div>

                        <div class="flex border border-dashed border-border rounded-full p-2 items-center justify-between">
                            <a href="#" class="flex items-center">
                                <img src="${new URL(`/api/v1/files/thumbnails/${book.cover_image_url}?q=10&w=38`, APP_API_URL)}" alt="Book Cover" class="size-9 object-cover rounded-full mr-4">
                                <p class="text-foreground/70 hover:text-primary"> ${book.author} </p>
                            </a>
                        </div>

                        <ul class="flex flex-col border rounded-2xl border-dashed border-border p-2 items-start justify-between">
                            <li> ISBN: <span class="text-primary">${book.isbn}</span></li>
                            <li> Category: <span class="text-primary">${book.category}</span></li>
                            <li> Language: <span class="text-primary">${book.language}</span></li>
                        </ul>

                    </div>
                </div>
            </div>
        `;
    }

    static skeleton = ({ length = 1, className }) => Array.from({ length }).map(() => `
        <div class="main w-full">
            <div class="flex max-lg:flex-col items-start justify-start gap-6">
                <div class="w-full border border-dashed rounded-2xl border-border p-5">
                    <div class="pb-7">
                        <div class="h-8 w-3/4 bg-foreground/10 animate-pulse rounded mb-2"></div>
                        <div class="h-4 w-1/2 bg-foreground/10 animate-pulse rounded mb-4"></div>
                        <div class="flex items-center gap-4 mb-4">
                            <div class="h-4 w-32 bg-foreground/10 animate-pulse rounded"></div>
                            <div class="h-4 w-32 bg-foreground/10 animate-pulse rounded"></div>
                        </div>
                    </div>

                    <div class="border rounded-2xl max-w-md mx-auto border-dashed border-border p-5">
                        <div class="h-16 bg-foreground/10 animate-pulse rounded"></div>
                    </div>

                    <div class="mt-5">
                        <div class="h-6 w-32 bg-foreground/10 animate-pulse rounded mb-3"></div>
                        <div class="h-24 bg-foreground/10 animate-pulse rounded mb-4"></div>
                        <div class="h-6 w-40 bg-foreground/10 animate-pulse rounded mb-3"></div>
                        <div class="space-y-2">
                            ${Array.from({ length: 5 }).map(() => `
                                <div class="h-4 w-3/4 bg-foreground/10 animate-pulse rounded"></div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="max-lg:w-full w-80 flex flex-col gap-2 shrink-0 lg:sticky top-5 max-lg:order-first order-last h-auto">
                    <div class="h-12 bg-foreground/5 animate-pulse rounded"></div>
                    <div class="min-h-80 bg-foreground/5 animate-pulse rounded"></div>
                    <div class="h-12 bg-foreground/5 animate-pulse rounded"></div>
                </div>
            </div>
        </div>
    `).join('');
}