const path = require('path')
const { DefinePlugin } = require('webpack')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode:"development",
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'./build'),
    filename:'bundle.js',
    // assetModuleFilename:"img/[name].[hash:6][ext]"
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        // loader:"css-loader",//写法一
        // use:['css-loader'], //写法二
        use:[
          /* 
           因为loader的执行顺序是从右向左（或者说从下到上，或者说从后到前的），
           所以我们需要将style-loader写到css-loader的前面
          */
          {loader:'style-loader'},
          {loader:"css-loader"},
          // 方式一：webpack中配置，还可以单独配置postcss文件
          // {
          //   loader:"postcss-loader",
          //   options:{
          //     postcssOptions:{
          //       plugins:[
          //         require('autoprefixer')
          //       ]
          //     }
          //   }
          // }
        ]
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      // {
      //   test:/\.(png|jpe?g|gif|svg)$/i,
      //   use:{
      //     loader:"url-loader",
      //     // loader:"file-loader",
      //     options:{
      //       // name:"img/[name].[hash:8].[ext]"
      //       limit:100 * 1024 ,
      //       name:"[name].[hash:8].[ext]",
      //       outputPath:"img"
      //     }
      //   }
      // }
      {
        test:/\.(png|jpe?g|gif|svg)$/i,
        type:"asset/resource",
        generator:{
          filename:"img/[name].[hash:6][ext]"
        },
        parser:{
          dataUrlCondition:{
            maxSize:100 * 1024
          }
        }
      },
      {
        test:/\.(woff2?|eot|ttf)$/,
        type:"asset/resource",
        generator:{
          filename:"font/[name].[hash:6][ext]"
        }
      },
      // 方式一：在webpack中配置，方式二：单独配置文件
      // {
      //   test:/\.m?js$/,
      //   use:{
      //     loader:'babel-loader',
      //     options:{
      //       presets:[
      //         ["@babel/preset-env"]
      //       ]
      //     }
      //   }
      // }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title:"webpack案例",
      template:"./public/index.html"
    }),
    new DefinePlugin({
      BASE_URL:'"./"'
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:"public",
          globOptions:{
            ignore:[
              '**/.DS_Store',
              '**/index.html'
            ]
          }
        }
      ]
    })
  ]
}