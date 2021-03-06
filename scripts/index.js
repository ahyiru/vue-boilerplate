const express=require('express');
const webpack=require('webpack');
const colors=require('colors');

const cors=require('cors');
const logger=require('morgan');
const bodyParser=require('body-parser');
const compression=require('compression');

const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackHotMiddleware=require('webpack-hot-middleware');

const webpackConfig=require('./webpack.development');

const {appName,HOST,PORT,PROXY_URL,MOCK}=require('../configs');

const getIPs=require('./getIPs');

const {createProxyMiddleware}=require('http-proxy-middleware');

const app = express();

const compiler = webpack(webpackConfig);

const proxyCfg=require('./appProxy');

const {prefix,opts}=proxyCfg(PROXY_URL);
app.use(prefix,createProxyMiddleware(opts));

const devMiddleware=webpackDevMiddleware(compiler,{
  publicPath:webpackConfig.output.publicPath,
  stats: {
    preset: 'minimal',
    moduleTrace: true,
    errorDetails: true,
    colors:true,
  },
});

app.use(webpackHotMiddleware(compiler));
app.use(devMiddleware);

app.set('host', HOST);
app.set('port', PORT);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({limit:'20mb',extended:true}));
app.use(compression());

// browserRouter
app.get('*',(req,res)=>{
  const htmlBuffer=compiler.outputFileSystem.readFileSync(`${webpackConfig.output.path}/index.html`);
  res.send(htmlBuffer.toString());
});

app.listen(app.get('port'),err=>{
  if(err){
    console.log(err);
    return false;
  }
  const ips=getIPs().map(ip=>`${ip}:${app.get('port')}`).join('\n');
  console.log('\n'+appName.magenta+': 服务已启动! '.cyan+'✓'.green);
  console.log(`\n监听端口: ${app.get('port')} ,正在构建,请稍后...`.cyan);
  console.log('-----------------------------------'.blue);
  console.log(`运行地址: \n`.magenta);
  console.log(`${ips} \n`.magenta);
  console.log(`如需打包部署到生产环境，请运行 `.cyan+`npm run build`.green);
  console.log('-----------------------------------'.blue);
  console.log('\n按下 CTRL-C 停止服务\n'.blue);
});



