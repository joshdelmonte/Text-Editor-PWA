const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
//Where ought I to put this? I'm not sure.
const { webpack } = require('webpack');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      //Is name the correct thing we should be putting in this filename?
      //I think it is, but I'm not sure.
      //I think it's the name of the entry point, which is what we want.
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'PWA Manifest',
        short_name: 'PWAM',
        description: 'PWA for everyone!',
        background_color: '#263cb3',
        theme_color: '#123pd3',
        start_url: './',
        publicPath: './',
        icons: [
          {favicon: './src/images/logo.png'},
        ],
      }),
    ],

    module: {
      rules: [
        //CSS loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        //Babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      
    },
  ],
},  
  };
};
