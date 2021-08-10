import staticRouters from './staticRouter';
import {traverItem} from '@huxy/utils';

const whiteList=[];

traverItem((item,parent)=>{
  const path=`${parent.map(v=>v.path).join('')}${item.path}`;
  whiteList.push(path);
})(staticRouters);

export default whiteList;



