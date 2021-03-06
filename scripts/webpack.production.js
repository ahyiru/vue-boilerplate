const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const rimraf = require('rimraf');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const {GenerateSW}=require('workbox-webpack-plugin');

const webpackConfig = require('./webpack.config');

const {appName,PRD_ROOT_DIR,BUILD_DIR}=require('../configs');

const rootDir=['/','./'].includes(PRD_ROOT_DIR)?PRD_ROOT_DIR:`${PRD_ROOT_DIR}/`;

const app=path.resolve(__dirname,`../${appName}`);
const build=path.resolve(app,BUILD_DIR);

rimraf(build,err=>console.log(err));

const postcssOptions={
  stage: 0,
  features: {
    'nesting-rules': true,
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

const frameChunks={
  vue:{
    idHint:'vue',
    test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
    enforce:true,
    priority:15,
  },
};

const plugins=[
  new MiniCssExtractPlugin({
    filename:'css/[name]_[contenthash:8].css',
    chunkFilename:'css/[id]_[name]_[contenthash:8].css',
    // publicPath:'../',
  }),
  new webpack.DefinePlugin({
    'process.env':{
      isDev:false,
    },
    EMAIL:JSON.stringify('ah.yiru@gmail.com'),
    VERSION:JSON.stringify('0.0.x'),
  }),
  new GenerateSW({
    // importWorkboxFrom: 'local',
    cacheId: 'demo-pwa',
    clientsClaim: true,
    skipWaiting: true,
  }),
  /* new CompressionPlugin({
    test: /\.(js|css)(\?.*)?$/i,
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }), */
];

const {ANALYZE}=process.env;

if(ANALYZE){
  plugins.push(new BundleAnalyzerPlugin());
}

const prodConfig=merge(webpackConfig, {
  mode:'production',
  // devtool:'cheap-module-source-map',
  output:{
    path:build,
    publicPath:rootDir,
    filename:'js/[name]_[contenthash:8].js',
    chunkFilename:'js/[name]_[chunkhash:8].chunk.js',
  },
  optimization:{
    minimize:true,
    minimizer:[
      new TerserPlugin({
        // cache: true,
        parallel: true,
        // sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console:true,
          },
          mangle: true,
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset:['default',{
            discardComments:{removeAll:true},
            // calc: false,
            // normalizePositions: false,
          }],
        },
      }),
    ],
    splitChunks:{
      chunks:'all',//'async','initial'
      // minSize:0,
      minSize:{
        javascript:8000,
        style:8000,
      },
      maxSize:{
        javascript:1000000,
        style:1000000,
      },
      minChunks:2,
      maxInitialRequests:10,
      maxAsyncRequests:10,
      // automaticNameDelimiter: '~',
      cacheGroups:{
        commons:{
          // chunks:'initial',
          // minSize:30000,
          idHint:'commons',
          test:app,
          priority: 5,
          reuseExistingChunk:true,
        },
        defaultVendors:{
          // chunks:'initial',
          idHint:'vendors',
          test:/[\\/]node_modules[\\/]/,
          enforce:true,
          priority:10,
        },
        ...frameChunks,
        echarts: {
          idHint:'echarts',
          chunks:'all',
          priority:20,
          test: function(module){
            const context = module.context;
            return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0);
          },
        },
      },
    },
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              // publicPath: '../',
            },
          },
          /* {
            loader:'isomorphic-style-loader',
          }, */
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              modules: {
                mode:'global',
                localIdentName:'[hash:base64:5]',
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
        // exclude: /components/,
      },
      {
        test:/\.less$/,
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              // publicPath: '../',
            },
          },
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              modules: {
                mode:'global',
                localIdentName:'[hash:base64:5]',
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
          {
            loader:'less-loader',
            options:{
              lessOptions:{
                javascriptEnabled:true,
              },
            },
          },
        ],
      },
      {
        test:/\.s[ac]ss$/i,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              // publicPath: '../',
            },
          },
          {
            loader:'css-loader',
            options:{
              importLoaders:2,
            },
          },
          {
            loader:'sass-loader',
            options:{
              implementation: require('sass'),
              sassOptions:{
                indentWidth:2,
              },
              /* additionalData:(content, loaderContext) =>{
                if(loaderContext.resourcePath.endsWith('app/styles/index.scss')) {
                  return content;
                }
                return `@import '~@app/styles/index.scss';${content};`;
              }, */
            },
          },
        ],
        exclude:[/node_modules/],
      },
    ],
  },
  plugins,
});

module.exports=prodConfig;


