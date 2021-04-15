const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {

  entry: './src/js/index.js',

  output: {
    path: path.join(__dirname, "/dist"), // add dist file to our project path
    publicPath: '', // اي المسار العام
    filename: "main.js"
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 9000,
    writeToDisk: true,
    stats: 'errors-only',
    overlay: true,//for errors
    open: true,
  },

  module: {

    rules: [

      {
        test: /\.(sass|css|scss)/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'  // import '../sass/style.scss'; 
            }
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', // keep the image name as in src folder
            outputPath: "images", // path in dist foldar
          },
        }, ],
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "fonts",
              esModule: false,
            }
          }
        ]
      },

      {
        test: /\.html$/i,
        loader: 'html-loader', // .html سيتعامل مع الصور والملفات التي بداخل 
      },

      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
      
    ],

  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //in dist
      template: "./src/index.html", //in src
    }),

    new HtmlWebpackPlugin({
      filename: "projects.html", 
      template: "./src/projects.html", 
    }),

    new HtmlWebpackPlugin({
      filename: "project-details.html", 
      template: "./src/project-details.html", 
    }),

    new HtmlWebpackPlugin({
      filename: "blog.html", 
      template: "./src/blog.html", 
    }),

    new HtmlWebpackPlugin({
      filename: "blog-details.html", 
      template: "./src/blog-details.html", 
    }),

    new HtmlWebpackPlugin({
      filename: "add-blog.html", 
      template: "./src/add-blog.html", 
    }),

    new MiniCssExtractPlugin({
      filename: "css/style.css"
    }),
  ],
};