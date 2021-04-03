const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
      },
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'main.js',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      "@": path.resolve('src/'),
    }
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: "src/assets/images/pokemon-icon.png"
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/assets/images/pokemon-icon.png', to: 'logo.png' },
      ]
    }),
  ]
};
