const app={
  HOST:process.env.IP||'localhost',
  PORT:process.env.PORT||8900,
  PRO_PORT:process.env.PRO_PORT||8901,
  BUILD_DIR:'./build',//'build',
  // DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'',
  PRD_ROOT_DIR:'/',
  PROXY_URL:'http://localhost:9202',
  TARGET:'/api',
  MOCK:'http://localhost:8902',
  SERVER_PORT:9202,
  basepath:'/',
  platform:'pc',
  appNane:'...',
};

module.exports=app;
