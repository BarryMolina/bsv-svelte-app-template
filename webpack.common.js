const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
	entry: ['./src/global.css', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/',
	},
    module: {
			rules: [
				// Allow use of modern javascript
				{
					test: /\.js?$/,
					exclude: /node_modules/, //don't test node_modules folder
					use: {
						loader: 'babel-loader',
					},
				},
				// Allow use of svelte
				{
					test: /\.svelte$/,
					use: {
						loader: 'svelte-loader',
					},
				},
				// Allow use of CSS
				{
					test: /\.css$/,
					use: [
						'css-loader'
					],
				},
				// Allow use of images
				{
					test: /\.(jpg|jpeg|png|svg)$/,
					use: 'file-loader',
				},
			],
    },
		// Enable users to leave off the extension when importing
    resolve: {
			extensions: ['.mjs', '.js', '.svelte'],
    },
    plugins: [
			// Get all css and put in a unique file
			new MiniCssExtractPlugin(),
			// Take environment variable in .env file
			// And do a text replace in the resulting bundle for any instances of process.env.
			new Dotenv(),
    ],
};