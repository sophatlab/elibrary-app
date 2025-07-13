import { Icons } from '../components/icons.js';
import { initializeLayout } from '../components/layout.js';
import { APP_API_URL, imageSource } from '../libs/constant.js';

const bookInitial = async () => {
    // get the id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    const authorProfile = document.getElementById('author-profile');

    const profile = await fetch(new URL(`/api/v1/authors/${bookId}`, APP_API_URL))
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => {
            console.error('Error fetching book:', error);
            return {};
        });

    if (profile.id === undefined) location.href = new URL('404', location.origin).toString();

    authorProfile.innerHTML = (`
        <div class="min-h-96 w-full relative bg-gradient-to-b from-primary/50 border-x border-t border-dashed border-border to-transparent rounded-2xl mb-5">
            <button class="button button-primary absolute px-2 right-5 top-5" onclick="navigator.share({
                title: '${profile.name} author of eBooks',
                text: 'Check out this author: ${profile.name}',
                url: window.location.href
            })">
                ${Icons.share()}
            </button>
            <div class="absolute max-sm:flex-col flex gap-5 -bottom-24 left-5">
                <img
                    src="${imageSource.src(`api/v1/files/authors/${profile.image}`, { w: 512 })}"
                    srcset="${imageSource.srcset(`api/v1/files/authors/${profile.image}`)}"
                    class="max-sm:size-32 size-48 rounded-full bg-primary"
                    alt="${profile.name}"/>
                <ul class="translate-y-2">
                    <h1 class="text-4xl font-bold">${profile.name}</h1>
                    <p class="mt-2">${profile.biography}</p>
                    <ul class="mt-3">
                        <li>
                            <a href="#" class="text-primary hover:underline inline-flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-book-2">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
                                    <path d="M19 16h-12a2 2 0 0 0 -2 2" />
                                    <path d="M9 8h6" />
                                </svg>
                                <span>${profile.books_count || 0} Book(s)</span>
                            </a>
                        </li>
                        <li>
                            <a href="${profile.website}" target="_blank" class="text-primary hover:underline inline-flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-world">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                    <path d="M3.6 9h16.8" />
                                    <path d="M3.6 15h16.8" />
                                    <path d="M11.5 3a17 17 0 0 0 0 18" />
                                    <path d="M12.5 3a17 17 0 0 1 0 18" />
                                </svg>
                                <span>${profile.website}</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.google.com/search?q=${profile.nationality}" class="text-primary hover:underline inline-flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-map-pin">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                </svg>
                                <span>${profile.nationality}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `)
}


document.addEventListener('DOMContentLoaded', async () => {
    initializeLayout()
    await bookInitial();
});
