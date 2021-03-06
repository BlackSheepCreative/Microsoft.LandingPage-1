var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
	entry: {
		app: "./js/main.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env"]
						// plugins: [require('babel-plugin-transform-object-rest-spread')]
					}
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: { loader: "style-loader" },
					use: [
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								url: false
							}
						},
						{
							loader: "postcss-loader"
						}
					]
				})
			}
		]
	},

	output: {
		path: path.join(__dirname, "./../static/dist"),
		filename: "[name].bundle.js"
	},

	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"]
	},

	plugins: [
		new ExtractTextPlugin("main.css"),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	watchOptions: {
		watch: true
	}
};
