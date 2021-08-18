const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const OpenBrowserWebpackPlugin = require('@huxy/open-browser-webpack-plugin');
const {appName,projectName,PUBLIC_DIR,BUILD_DIR,DEV_ROOT_DIR,HOST,PORT}=require('../configs');

const publics=path.resolve(__dirname,PUBLIC_DIR);
const app=path.resolve(__dirname,`../${appName}`);

// const rootDir=DEV_ROOT_DIR==='/'?DEV_ROOT_DIR:`${DEV_ROOT_DIR}/`;

const entry={
  app:[path.resolve(app,'index.js')],
  vue:['vue'],
};
const templ=path.resolve(publics,'index.html');
const icon=path.resolve(publics,'favicon.png');

const htmlPlugin=()=>new HtmlWebpackPlugin({
  title:projectName||appName,
  template:templ,
  favicon:icon,
  inject:true,
  minify:{
    html5:true,
    collapseWhitespace:true,
    // conservativeCollapse:true,
    removeScriptTypeAttributes:true,
    removeStyleLinkTypeAttributes:true,
    removeComments:true,
    removeTagWhitespace:true,
    removeEmptyAttributes:true,
    removeRedundantAttributes:true,
    useShortDoctype:true,
    keepClosingSlash:true,
    minifyJS:true,
    minifyCSS:true,
    minifyURLs:true,
  },
});

const plugins=[
  htmlPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
  }),
  /* new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 5,
  }), */
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000,
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  // new BundleAnalyzerPlugin(),
  new webpack.ProgressPlugin({
    activeModules:false,
    entries:true,
    handler:(percentage,message,...args)=>{
      // custom logic
    },
    modules:true,
    modulesCount:5000,
    profile:false,
    dependencies:true,
    dependenciesCount:10000,
    percentBy:null,
  }),
  new VueLoaderPlugin(),
  new OpenBrowserWebpackPlugin({target:`${HOST}:${PORT}`}),
];

const rules=[
  {
    test: /\.vue$/,
    loader:'vue-loader',
    options:{
      refSugar: true,
    },
    exclude:/node_modules/,
  },
  {
    test:/\.jsx?$/,
    loader:'babel-loader',
    options:{
      cacheDirectory:true,
    },
    exclude:[/node_modules/,/draft/,path.resolve(__dirname,'node')],
  },
  {
    test:/\.(jpe?g|png|gif|psd|bmp|ico|webp|svg)$/i,
    loader:'url-loader',
    options:{
      limit:20480,
      name:'img/img_[hash:8].[ext]',
      // publicPath:'../',
      esModule:false,
    },
    type:'javascript/auto',
    exclude:[/node_modules/],
  },
  {
    test:/\.(ttf|eot|svg|woff|woff2|otf)$/,
    loader:'url-loader',
    options:{
      limit:20480,
      name:'fonts/[hash:8].[ext]',
      publicPath:'../',
      esModule:false,
    },
    exclude:[/images/],
  },
];

module.exports={
  context:app,
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [ __filename ],
    },
  },
  experiments:{
    topLevelAwait:true,
    // outputModule:true,
    // syncWebAssembly:true,
    // asyncWebAssembly:true,
    // layers:true,
    // lazyCompilation:true,
  },
  entry:entry,
  output:{
    path:path.resolve(app,BUILD_DIR),
    publicPath:DEV_ROOT_DIR,
    filename:'js/[name].js',
    // chunkFilename:'js/[name]_[chunkhash:8].chunk.js',
    // assetModuleFilename: 'assets/[contenthash][ext]',
    /* library:{
      name:`${appName}App`,
      type:'umd',
      export:'default',
    }, */
    // umdNamedDefine:true,
    // globalObject:'this',
  },
  optimization:{
    // minimize:true,
    concatenateModules:false,
    usedExports:false,
    sideEffects:false,
    splitChunks:false,
    runtimeChunk:'single',
    moduleIds:'deterministic',
    chunkIds:'named',
  },
  externals:{
    // react:'react',
    // vue:'vue',
  },
  resolve:{
    modules:[
      app,
      'node_modules',
    ],
    alias:{
      '@app':app,
      '@configs':path.resolve(__dirname, '../configs'),
      '@common':path.resolve(__dirname, '../commons'),
      // 'vue$':'vue/dist/vue.esm-bundler.js',
    },
    extensions:['.vue','.jsx','.js','.scss','.less','.css','.json','.ts','.tsx','.mjs'],
    fallback: {
      path: false,//require.resolve('path-browserify'),
      process: false,
    },
    symlinks:false,
    cacheWithContext:false,
  },
  module:{
    rules:rules,
  },
  plugins:plugins,
};


