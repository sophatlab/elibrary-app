import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',

    // Multiple entry points for different pages
    entry: {
        index: './src/js/index.js',
        catalog: './src/js/catalog.js',
        book: './src/js/book.js',
        admin: './src/js/admin.js'
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

        // Generate HTML files for each page
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
            filename: 'index.html',
            chunks: ['index'],
            title: 'eLibrary - Home'
        }),

        new HtmlWebpackPlugin({
            template: './src/pages/catalog.html',
            filename: 'catalog.html',
            chunks: ['catalog'],
            title: 'eLibrary - Book Catalog'
        }),

        new HtmlWebpackPlugin({
            template: './src/pages/book.html',
            filename: 'book.html',
            chunks: ['book'],
            title: 'eLibrary - Book Details'
        }),

        new HtmlWebpackPlugin({
            template: './src/pages/admin.html',
            filename: 'admin.html',
            chunks: ['admin'],
            title: 'eLibrary - Admin Panel'
        })
    ],

    devServer: {
        static: './dist',
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /^\/catalog/, to: '/catalog.html' },
                { from: /^\/book/, to: '/book.html' },
                { from: /^\/admin/, to: '/admin.html' }
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
