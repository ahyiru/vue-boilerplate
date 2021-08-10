import {storage} from '@huxy/utils';

import whiteList from '../router/whiteList';

import eventStore from './eventStore';

export const browserRouter=!process.env.isDev;

const {DEV_ROOT_DIR,PRD_ROOT_DIR}=require('@configs');

export const basepath=browserRouter?PRD_ROOT_DIR:DEV_ROOT_DIR;

const initPath=`${browserRouter?'':'#'}/`;

const whiteRouters=browserRouter?whiteList:whiteList.map(path=>`#${path}`);

const token=storage.get('token');

const beforeRender=(input,next)=>{
  const {path,prevPath}=input;
  const validPath=path.split('?')[0];
  if(validPath===initPath){
    return next({path:'/'});
  }
  if(!token&&!whiteRouters.includes(validPath)){
    return next({path:'/user/signin'});
  }
  next();
  // routerListenFn(path,prevPath);
};

export default {
  browserRouter,
  beforeRender,
  basepath,
  eventStore,
  // afterRender,
  // store:createStore(),
};



