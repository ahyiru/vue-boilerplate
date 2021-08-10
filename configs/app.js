const app={
  HOST:process.env.IP||'localhost',
  PORT:process.env.PORT||8800,
  PRO_PORT:process.env.PRO_PORT||8801,
  BUILD_DIR:'./build',//'build',
  // DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'',
  PRD_ROOT_DIR:'/',
  PROXY_URL:'http://47.105.94.51:9202',
  TARGET:'/api',
  MOCK:'http://localhost:8802',
  SERVER_PORT:9202,
  basepath:'/',
  platform:'pc',
  appNane:'...',
};

module.exports=app;
