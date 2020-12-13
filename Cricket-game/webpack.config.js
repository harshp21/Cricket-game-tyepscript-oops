const path = require('path');

module.exports = {
    entry: './script.ts',
    output: {
        filename: 'script.js',
        path: __dirname,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};