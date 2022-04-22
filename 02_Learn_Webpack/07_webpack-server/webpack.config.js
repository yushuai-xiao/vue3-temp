const path = require('path')

const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader/dist/index');
module.exports = {
  // 设置模式
  // development 开发阶段, 会设置development
  // production 准备打包上线的时候, 设置production
  mode: "development",
  // 设置source-map, 建立js映射文件, 方便调试代码和错误
  devtool: "source-map",
  entry:"./src/main.js",
  output:{
    path:path.resolve(__dirname,'./dist'),
    filename:'js/bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      watch: false,
    },
    hot:true,
    host:"127.0.0.1",
    open:true,
    // compress: true,
    port: 8888,
  },
  resolve:{
    extensions:[".js",".json",".mjs",".vue",".ts",".jsx"],
    alias:{
      "@":path.resolve(__dirname,"./src"),
      "js":path.resolve(__dirname,"./src/js")
    }
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
  ],
  // 方式一：配置文件中配置，方式二，在package.json的scripts中添加一个watch的脚本
  // watch:true
}