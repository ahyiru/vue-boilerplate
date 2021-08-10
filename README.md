## vue-boilerplate

基于 `webpack` 搭建的项目脚手架。

### 工程

集成了：

- `eslint`：es代码规范
- `stylelint`：样式规范
- `jest`：单元测试
- `husky`：代码提交验证
- `http-proxy`：代理配置

代码规范及commit规范，团队讨论决定，可自行配置。

可根据需求选取 `loader`、 `plugins`等。

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

### 目录结构

```
-app
  - apis
  - assets
  - components
  - configs
  - hooks
  - routers
  - utils
  - views
- common
  - layout
  - styles
  - components
  - use
- configs
- scripts

```

- `configs`：配置文件
- `scripts`：`webpack` 打包、`nodejs` 服务启动配置
- `common`：全局通用样式、组件、hooks
- `app`：项目入口及物料

### 模块

#### 主题管理

提供了 `layout` 层主题管理，通过 `configs/theme` 即可配置。全局样式放在 `common/styles` 里面，可根据项目自行配置。

#### 路由设置

支持动态路由，根据具体项目设置。

#### 权限管理

可根据用户权限来动态加载权限路由。

#### 接口管理

封装通用接口请求函数。包含：`token` 验证、请求劫持、错误处理、数据格式化等。

#### 状态管理

提供基于发布订阅模式的 `useStore` 来做状态管理，或选取第三方库。

#### i18n设置

根据项目自行配置 `i18n` 。

#### 组件

基础组件可选第三方UI库，业务组件按照规范开发。

#### hooks

提取通用hooks或业务hooks。

