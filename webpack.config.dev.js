const path = require('path');
const {readFileSync} = require("fs");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        https: {
            key: readFileSync("localhost.key"),
            cert: readFileSync("localhost.crt"),
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true
            }
        },
        port: 3001,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },

        ],
    },
    plugins: [
        new Dotenv({
            path: './.env',
            systemvars: true
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};