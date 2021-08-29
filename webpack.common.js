const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
  //Our index file
    entry: ['./src/global.css', './src/index.js'],
  //Where we put the production code
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/',
    },
    module: {
        rules: [
      //Allows use of modern javascript
            {
                test: /\.js?$/,
                exclude: /node_modules/, //don't test node_modules folder
                use: {
                    loader: 'babel-loader',
                },
            },
      //Allows use of svelte
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                },
            },
      //Allows use of CSS
            {
                test: /\.css$/,
                use: [
									'css-loader'
								],
            },
      //Allows use of images
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: 'file-loader',
            },
        ],
    },
		//this is what enables users to leave off the extension when importing
    resolve: {
			extensions: ['.mjs', '.js', '.svelte'],
    },
    plugins: [
			//This gets all our css and put in a unique file
			new MiniCssExtractPlugin(),
			//take our environment variable in .env file
			//And it does a text replace in the resulting bundle for any instances of process.env.
			new Dotenv(),
    ],
};