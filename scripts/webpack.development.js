const webpack = require('webpack');
const {merge} = require('webpack-merge');
const postcssPresetEnv = require('postcss-preset-env');
// const {GenerateSW}=require('workbox-webpack-plugin');
const webpackConfig = require('./webpack.config');

const postcssOptions={
  stage: 0,
  features: {
    'nesting-rules':true,
  },
  // autoprefixer: { grid: true }
  browsers: 'last 2 versions',
  importFrom:[
    // './configs/themeCfg.js',
    ()=>{
      const environmentVariables={
        '--viewport-1':'1200px',
      };
      return {environmentVariables};
    },
  ],
};

const devConfig=merge(webpackConfig,{
  mode:'development',
  devtool:'eval-cheap-module-source-map',
  // target:'web',
  entry:{
    app:['webpack-hot-middleware/client?reload=true'],
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options:{
              importLoaders:1,
              modules:{
                mode:'global',
                localIdentName:'[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                plugins:()=>[
                  postcssPresetEnv(postcssOptions),
                ],
              },
            },
          },
        ],
      },
      {
        test:/\.less$/,
        use: [
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              modules:{
                mode:'global',
                localIdentName:'[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // execute:true,
              postcssOptions:{
                // parser:'postcss-js',//'sugarss',
                plugins:()=>[
                  postcssPresetEnv(postcssOptions),
                ],
              },
            },
          },
          {
            loader:'less-loader',
            options:{
              lessOptions:{
                javascriptEnabled:true,
              },
            },
          },
        ],
        // exclude:[/node_modules/],
      },
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        isDev:true,
      },
      EMAIL:JSON.stringify('ah.yiru@gmail.com'),
      VERSION:JSON.stringify('0.0.x'),
      // __VUE_OPTIONS_API__: false,
      // __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
});

module.exports=devConfig;
