import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from 'url';
import { APP_NAME, APP_DESCRIPTION } from './src/libs/constant.js'; // Removed APP_DESCRIPTION
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest'; // Removed unused import
import { screenshots } from './src/libs/web-manifest.js'; // Removed unused imports
import CopyWebpackPlugin from 'copy-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const src = path.resolve(__dirname, "src")

const views = [
    {
        template: './src/pages/index.html',
        filename: 'index.html',
        chunks: ['index'],
        title: `${APP_NAME} - Home`
    },
    {
        template: './src/pages/collection.html',
        filename: 'collection/index.html',
        chunks: ['collection'],
        title: `${APP_NAME} - Collection`
    },
    {
        template: './src/pages/[collection].html',
        filename: 'collection/book/index.html',
        chunks: ['collection-book'],
        title: `${APP_NAME} - Book Details`
    },
    {
        template: './src/pages/authors.html',
        filename: 'authors/index.html',
        chunks: ['authors'],
        title: `${APP_NAME} - Authors`
    },
    {
        template: './src/pages/[authors].html',
        filename: 'authors/profile/index.html',
        chunks: ['author-profile'],
        title: `${APP_NAME} - Author Details`
    },
    {
        template: './src/pages/about-us.html',
        filename: 'about-us/index.html',
        chunks: ['about-us'],
        title: `${APP_NAME} - About Us`
    },
    {
        template: './src/pages/404.html',
        filename: '404/index.html',
        chunks: ['404'],
        title: `${APP_NAME} - Page Not Found`
    }
]


export default {
    mode: 'development',

    // Multiple entry points for different pages
    entry: {
        index: './src/js/index.js',
        collection: './src/js/collection.js',
        'collection-book': './src/js/[collection].js',
        authors: './src/js/authors.js',
        'author-profile': './src/js/[authors].js',
        'about-us': './src/js/about-us.js',
        '404': './src/js/404.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),

        new WebpackManifestPlugin({
            fileName: 'mainfest.json',
            publicPath: '/'
        }),

        new WebpackPwaManifest({
            publicPath: '/',
            name: APP_NAME,
            short_name: "ebooks",
            description: APP_DESCRIPTION,
            start_url: "/",
            background_color: "#ffffff",
            theme_color: "#ffffff",
            icons: [
                {
                    src: path.resolve(src, 'assets/icons/android-chrome-512x512.png'),
                    sizes: [96, 128, 256, 384, 512],
                    type: "image/png",
                    purpose: "maskable",
                    destination: path.join('assets', 'icons'),
                },
                {
                    src: path.resolve(src, 'assets/icons/android-chrome-512x512.png'),
                    sizes: [192],
                    type: "image/png",
                    purpose: "any",
                    destination: path.join('assets', 'icons'),
                },
            ],
            screenshots: screenshots,
            filename: "site.webmanifest",
            inject: true,
            fingerprints: true,
        })

    ].concat(
        views.map(view => new HtmlWebpackPlugin({
            template: view.template,
            filename: view.filename,
            chunks: view.chunks,
            title: view.title,
            meta: {
                robots: { name: 'robots', content: 'index, follow' },
                themeColor: { name: 'theme-color', content: '#ffffff' },
            },
            inject: 'body',
            domain: 'https://ebooks.sophat.top'
        })),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(src, 'assets'), to: 'assets' },
                // { from: path.resolve(src, 'favicon.ico'), to: '' },
                // { from: path.resolve(src, 'robots.txt'), to: '' }
            ]
        })
    ),

    devServer: {
        static: './dist',
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /^\/collection$/, to: '/collection/index.html' },
                { from: /^\/collection\/book/, to: '/collection/book/index.html' },
                { from: /^\/authors$/, to: '/authors/index.html' },
                { from: /^\/authors\/profile/, to: '/authors/profile/index.html' },
                { from: /^\/about-us$/, to: '/authors/about-us/index.html' },
                { from: /./, to: '/404/index.html' }  // Catch-all for 404
            ]
        }
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                common: {
                    minChunks: 2,
                    chunks: 'all',
                    name: 'app'
                }
            }
        }
    },
    performance: {
        hints: 'warning', // 'error' | 'warning' | false
        maxAssetSize: 2 * 1024 * 1024, // 2 MiB, adjust as needed
        maxEntrypointSize: 2 * 1024 * 1024, // 2 MiB, adjust as needed
    }
};
