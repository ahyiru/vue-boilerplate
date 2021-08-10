## vue-boilerplate

基于 `webpack` 搭建的项目脚手架。

集成了：

- eslint：es代码规范
- stylelint：样式规范
- jest：单元测试
- husky：代码提交验证

代码规范及commit规范，团队讨论决定，可自行配置。

### 脚本

启动项目

```js
npm start

```
项目打包

```js
npm run build

```

打包分析

```js
npm run analyze

```
运行打包文件

```js
npm run server

```
test & lint

```js
npm test
npm run eslint
npm run stylelint
npm run lint-fix

```

端口、代理等配置

```js
// configs.js

const app={
  PORT:process.env.PORT||8800,
  PRO_PORT:process.env.PRO_PORT||8801,
  BUILD_DIR:'./build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'',
  PROXY_URL:'http://localhost:9002',
};

```

### 项目目录

- api
- assets
- components
- configs
- hooks
- routers
- utils
- views
- layout

### 其它

#### 权限管理

#### 主题管理

#### i18n设置

