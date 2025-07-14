export const APP_NAME = 'eBooks';
export const APP_API_URL = 'https://api.sophat.top';

export const imageSource = {
    src: (path, options) => {
        const defaultOptions = {
            q: 60,
            w: 100
        }
        options = { ...defaultOptions, ...options };
        const url = new URLSearchParams(options);
        return new URL(`${path}?${url.toString()}`, APP_API_URL).toString();
    },
    srcset: (path) => {
        const sizes = [50, 100, 200, 400, 800];
        return sizes.map(size => `${new URL(`${path}?q=10&w=${size}`, APP_API_URL).toString()} ${size}w`).join(', ');
    },
    error: new URL(`/api/v1/files/thumbnails/error.webp?q=60&w=512`, APP_API_URL).toString()
};

export const linkOriginal = (path) => {
    return new URL(path, location.origin).toString();
}