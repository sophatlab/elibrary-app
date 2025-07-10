import { cn } from "../libs/tailwind.js"

export const loadingCard = ({ length = 10, className }) => Array.from({ length }).map(() => `
    <li class="${cn("bg-card border shrink-0 w-32 @sm:w-44 overflow-hidden border-border/5 rounded animate-pulse", className)}">
        <div class="border border-border/10 rounded-lg w-full aspect-[3/4] bg-foreground/10 relative"></div>
        <div class="p-2">
            <h3 class="font-semibold bg-foreground/10 h-4 w-3/4 mb-1"></h3>
            <p class="text-xs bg-foreground/20 h-3 w-1/2"></p>
        </div>
    </li>`
).join('')