const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // Entry point of your React app
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory
    filename: 'bundle.js',  // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Regex to match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Allow importing .js and .jsx without specifying the extension
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // HTML template file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),  // Serve files from the dist folder
    port: 3000,  // Development server port
  },
};
