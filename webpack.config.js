const path = require("path");

module.exports = {
 entry: "./src/index.js",
 output: {
   filename: "bundle.js",
   path: path.join(__dirname, "dist")
 },
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader"
       }
     },
     {
       test: /\.less$/,
       use: [
         {
           loader: "style-loader"
         },
         {
           loader: "css-loader",
           options: {
             sourceMap: true,
             modules: {
               localIdentName: "[local]___[hash:base64:5]"
             }
           }
         },
         {
           loader: "less-loader"
         }
       ]
     }
   ]
 }
};