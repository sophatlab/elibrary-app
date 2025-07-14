import { imageSource, linkOriginal } from "../libs/constant.js"
import { cn } from "../libs/tailwind.js"

export class Cards {

    static skeleton = ({ length = 10, className }) => Array.from({ length }).map(() => `
        <li class="${cn("bg-card border shrink-0 w-full overflow-hidden border-border/5 rounded animate-pulse", className)}">
            <div class="border border-border/10 rounded w-full aspect-[3/4] bg-foreground/10 relative"></div>
            <div class="my-2">
                <h3 class="font-semibold bg-foreground/10 rounded-full h-4 w-3/4 mb-2"></h3>
                <p class="text-xs bg-foreground/20 h-3 rounded-full w-1/2"></p>
            </div>
        </li>`
    ).join('')


    static book = (book) => {
        const authors = book.authors || []
        return (
            `<li>
                <a href="${linkOriginal(`collection/book?id=${book.id}`)}" class="shrink-0 w-full relative overflow-hidden">
                    <div class="border border-border/10 rounded w-full aspect-[3/4] bg-foreground/10 relative">
                        <img
                            src="${imageSource.src(book.image)}"
                            srcset="${imageSource.srcset(book.image)}"
                            sizes="(max-width: 640px) 100vw, 176px"
                            alt="${book.title}"
                            loading="lazy"
                            width="250"
                            height="333"
                            class="w-full h-full rounded object-cover transition-opacity duration-300 opacity-0 z-50 absolute inset-0"
                            onload="this.classList.remove('opacity-0')"
                            onerror="this.onerror=null; this.src='${imageSource.error}';"
                            fetchpriority="auto"
                        >
                    </div>
                    <div class="my-2">
                        <h3 class="font-semibold">${book.title}</h3>
                        <p class="text-xs">${authors.map(author => author.name).join(" • ")}</p>
                    </div>
                </a>
            </li>`
        )
    }

    static relatedBook = (book) => {
        const authors = book.authors || []
        return (
            `<li class="shrink-0 relative w-32 @sm:w-44 overflow-hidden rounded">
                <div class="border border-border/10 rounded-lg w-full aspect-[3/4] bg-foreground/10 relative">
                    <img
                    src="${imageSource.src(book.image)}"
                    srcset="${imageSource.srcset(book.image)}"
                    sizes="(max-width: 640px) 100vw, 176px"
                    alt="${book.title} book cover"
                    loading="lazy"
                    width="250"
                    height="333"
                    class="w-full h-full rounded-lg object-cover transition-opacity duration-300 opacity-0 absolute inset-0"
                    onload="this.classList.remove('opacity-0')"
                    onerror="this.onerror=null; this.src='${imageSource.error}';"
                    fetchpriority="auto"
                    >
                </div>
                <div class="mb-2">
                    <h3 class="font-semibold">${book.title}</h3>
                    <p class="text-xs">${authors.map(author => author.name).join(" • ")}</p>
                </div>
                <a href="${linkOriginal(`collection/book?id=${book.id}`)}"
                    aria-label="View details of ${book.title} by ${book.author}"
                    class="absolute inset-0"></a>
            </li>`
        )
    }


    static recommendedBook = (book, index) => {
        const authors = book.authors || []
        return (
            `<li class="shrink-0 relative w-32 @sm:w-44 overflow-hidden rounded">
                <img
                    src="${imageSource.src(`/api/v1/files/thumbnails/${book.cover_image_url || book.image}`)}"
                    srcset="${imageSource.srcset(`/api/v1/files/thumbnails/${book.cover_image_url || book.image}`)}"
                    sizes="(max-width: 640px) 128px, 176px"
                    alt="${book.title}"
                    loading="${index < 4 ? 'eager' : 'lazy'}"
                    width="250"
                    height="333"
                    class="max-sm:h-36 border border-border/10 rounded-lg w-full object-cover aspect-[3/4]"
                    onerror="this.onerror=null; this.src='${imageSource.error}';"
                    fetchpriority="${index < 2 ? 'high' : 'auto'}"
                >
                <div>
                    <h3 class="font-semibold">${book.title}</h3>
                    <p class="text-xs">${authors.map(author => author.name).join(" • ")}</p>
                </div>
                <a href="${new URL(`collection/book?id=${book.id}`, location.origin)}" class="absolute inset-0"></a>
            </li>`
        )
    }


    static author = (author) => {
        return (
            `<li class="shrink-0">
                <a href="${new URL(`authors/profile/?id=${author.id}&name=${author.name}`, location.href)}" class="flex flex-col items-center max-w-28" aria-label="${author.name} author of eBooks">
                    <img
                        src="${imageSource.src(`/api/v1/files/authors/${author.image}`)}"
                        srcset="${imageSource.srcset(`/api/v1/files/authors/${author.image}`)}"
                        sizes="(max-width: 640px) 100vw, 80px"
                        loading="lazy"
                        width="80"
                        height="80"
                        onerror="this.onerror=null; this.src='${imageSource.error}';"
                        fetchpriority="auto"
                        alt="${author.name}" class="size-16 ring-2 ring-primary/90 rounded-full mb-2"
                    >
                    <h3 class="text-sm font-medium line-clamp-1">${author.name}</h3>
                    <span class="text-xs">${author.books_count} book</span>
                </a>
            </li>`
        )
    }

    static authorSkeleton = ({ length = 4, className }) => Array.from({ length }).map(() => `
        <li class="${cn("bg-card border shrink-0 w-full overflow-hidden border-border/5 rounded animate-pulse", className)}">
            <div class="flex flex-col items-center max-w-28">
                <div class="size-16 bg-foreground/10 rounded-full mb-2"></div>
                <h3 class="text-sm font-medium bg-foreground/10 h-4 w-3/4 mb-1"></h3>
                <span class="text-xs bg-foreground/20 h-3 w-1/2"></span>
            </div>
        </li>`
    ).join('')
}