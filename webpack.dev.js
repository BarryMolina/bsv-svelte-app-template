const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');

const util = require('util')

const dev = {
  mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 
				],
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			template: path.resolve(__dirname, 'public/index.html'),
		}),
	],
	devServer: {
			historyApiFallback: true,
			static: path.resolve(__dirname, 'dist'),
			hot: true,
	},
}

const merged = mergeWithRules({
	module: {
		rules: {
			test: "match",
			use: "prepend"
		},
	},
	plugins: "append"
})(common, dev)

// console.log(util.inspect(merged, false, null, true))

module.exports = merged