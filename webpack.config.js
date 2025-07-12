import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const views = [
    {
        template: './src/pages/index.html',
        filename: 'index.html',
        chunks: ['index'],
        title: 'eBooks Library - Home'
    },
    {
        template: './src/pages/collection.html',
        filename: 'collection/index.html',
        chunks: ['collection'],
        title: 'eBooks Library - Collection'
    },
    {
        template: './src/pages/[collection].html',
        filename: 'collection/book/index.html',
        chunks: ['collection-book'],
        title: 'eBooks Library - Book Details'
    },
    {
        template: './src/pages/authors.html',
        filename: 'authors/index.html',
        chunks: ['authors'],
        title: 'eBooks Library - Authors'
    },
    {
        template: './src/pages/404.html',
        filename: '404/index.html',
        chunks: ['404'],
        title: 'eLibrary - Page Not Found'
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
        '404': './src/js/404.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]'
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),

    ].concat(
        views.map(view => new HtmlWebpackPlugin({
            template: view.template,
            filename: view.filename,
            chunks: view.chunks,
            title: view.title,
        }))
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
                { from: /^\/admin/, to: '/admin.html' },
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
                    name: 'common'
                }
            }
        }
    }
};
