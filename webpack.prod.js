const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const path = require('path');
const { mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');

const util = require('util')

const prod = {
  mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader'
				],
			},
		]
	},
	plugins: [
		// Create index.html in build folder
		new HtmlWebpackPlugin({
			inject: 'body', // Where js is injected
			template: path.resolve(__dirname, 'public/index.html'),
		}),
		// Inline script chunks into index.html
		new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle/]),
	]
}

const merged = mergeWithRules({
	module: {
		rules: {
			test: "match",
			use: "prepend"
		},
	},
	plugins: "append"
})(common, prod)

// console.log(util.inspect(merged, false, null, true))

module.exports = merged