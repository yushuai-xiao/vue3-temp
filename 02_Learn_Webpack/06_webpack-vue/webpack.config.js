const path = require('path')

const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader/dist/index');
module.exports = {
  mode:"development",
  entry:"./src/main.js",
  output:{
    path:path.resolve(__dirname,'./build'),
    filename:'js/bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.(jpe?g|png|gif|svg)$/,
        type:"asset",
        generator:{
          filename:"img/[name]_[hash:6][ext]"
        },
        parser:{
          dataUrlCondition:{
            maxSize: 10 * 1024
          }
        }
      },
      {
        test:/\.m?js$/,
        use:{
          loader:"babel-loader",
          options:{
            presets:[
              ["@babel/preset-env"]
            ]
          }
        }
      },
      {
        test:/\.vue$/,
        loader:"vue-loader"
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template:"./public/index.html",
      title:"webpack"
    }),
    new DefinePlugin({
      BASE_URL:"'./'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:"public",
          to:"./",
          globOptions:{
            ignore:[
              "**/index.html"
            ]
          }
        }
      ]
    }),
    new VueLoaderPlugin()
  ]
}