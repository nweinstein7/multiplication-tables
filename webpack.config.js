 var path = require('path');
 var webpack = require('webpack');
     
 module.exports = {
     entry: './js/main.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         publicPath: '/build/',
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015','react']
                 },
                 exclude: /(node_modules|bower_components)/
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
