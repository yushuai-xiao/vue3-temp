const path = require('path')

module.exports = {
  mode:"development",
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'./build'),
    filename:'bundle.js'
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

    ]
  }
}