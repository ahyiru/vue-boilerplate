const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

const {appName,projectName,PUBLIC_DIR,BUILD_DIR,DEV_ROOT_DIR,publicPath}=require('../configs');

const publics=path.resolve(__dirname,PUBLIC_DIR);
const app=path.resolve(__dirname,`../${appName}`);

// const rootDir=DEV_ROOT_DIR==='/'?DEV_ROOT_DIR:`${DEV_ROOT_DIR}/`;

const frameChunks={
  vue:{
    idHint:'vue',
    test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
    enforce:true,
    priority:15,
  },
};

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
];

const rules=[
  {
    test:/\.m?js/,
    resolve:{
      fullySpecified:false,
    },
  },
  {
    test: /\.vue$/,
    loader:'vue-loader',
    exclude:/node_modules/,
  },
  {
    test:/\.(js|jsx)$/,
    loader:'babel-loader',
    exclude:[/node_modules/,/draft/,path.resolve(__dirname,'node')],
  },
  {
    test:/\.tsx?$/,
    use:[
      {loader:'babel-loader'},
      {loader:'ts-loader'},
    ],
    exclude:[/node_modules/,/draft/],
  },
  {
    test: /\.html$/,
    use: {
      loader: 'html-loader',
      options: {
        minimize:true,
      },
    },
    include:[app],
  },
  {
    test:/\.md$/,
    use:[
      {
        loader:'html-loader',
        options:{
          minimize:false,
        },
      },
    ],
  },
  {
    test:/\.(jpe?g|png|gif|psd|bmp|ico|webp|svg)/i,
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
    test:/\.(ttf|eot|svg|woff|woff2|otf)/,
    loader:'url-loader',
    options:{
      limit:20480,
      name:'fonts/[hash:8].[ext]',
      publicPath:'../',
    },
    exclude:[/images/],
  },
  {
    test:/\.pdf/,
    loader:'url-loader',
    options:{
      limit:20480,
      name:'pdf/[hash].[ext]',
    },
  },
  {
    test:/\.(swf|xap|mp4|webm)/,
    loader:'url-loader',
    options:{
      limit:20480,
      name:'video/[hash].[ext]',
    },
  },
];

module.exports={
  context:app,
  /* cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [ __filename ],
    },
  }, */
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
    publicPath,
    filename:'js/[name]_[contenthash:8].js',
    chunkFilename:'js/[name]_[chunkhash:8].chunk.js',
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
    minimize:true,
    concatenateModules:false,
    usedExports:false,
    sideEffects:false,

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
    // runtimeChunk:true,
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
    extensions:['.js','.mjs','.cjs','.jsx','.ts','.tsx','.json','.css','.less','.vue'],
    fallback: {
      path: false,
      process: false,
    },
  },
  module:{
    rules:rules,
  },
  plugins:plugins,
};


