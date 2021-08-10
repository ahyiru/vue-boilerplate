import getThemeList from './theme';
import getLang from '@app/utils/getLang';
import {logout} from '@app/utils/auth';

import defUser from '@app/assets/images/user/2.png';

import zh_icon from '@app/assets/icons/zh.png';
import en_icon from '@app/assets/icons/en.png';
import jp_icon from '@app/assets/icons/jp.png';

const langIcons={zh_icon,en_icon,jp_icon};

import Anico from '@common/components/anico';

export const leftNav=({store})=>{
  const i18ns=store.getState('i18ns');
  const {left}=i18ns?.nav??{};
  return [
    {
      name:left?.['collapse']??'collapse',
      type:'collapse',
      Custom:({collapsed})=><Anico type={collapsed.value?'right':''} />,
    },
    {
      name:left?.['projectList']??'projectList',
      type:'projectList',
      arrowDir:'lt',
      Ricon:true,
      children:[
        {
          name:'智能分析',
          icon:'Operation',
          type:'link',
          link:'https://v3.cn.vuejs.org/',
        },
        {
          name:'用户洞察',
          icon:'Monitor',
          type:'link',
          link:'https://v3.cn.vuejs.org/',
        },
        {
          name:'智慧运营',
          icon:'DataLine',
          type:'link',
          link:'https://v3.cn.vuejs.org/',
        },
      ],
    },
  ];
};
export const rightNav=({store})=>{
  const language=getLang();
  const i18ns=store.getState('i18ns')||{};
  const user=store.getState('profile');
  const themeKey=store.getState('huxy-theme')?.key;
  const {theme}=i18ns;
  const {right}=i18ns.nav??{};
  return [
    {
      name:user?.name??right?.['user'],
      img:user?.avatar??defUser,
      children:[
        {
          name:right?.['profile']??'个人中心',
          type:'profile',
          icon:'User',
          path:'/profile',
        },
        {
          name:right?.['logout']??'退出',
          type:'logout',
          icon:'Fold',
          handle:item=>{
            logout();
          },
        },
      ],
    },
    {
      name:right?.[language]??'语言',
      Custom:()=><div className="icon"><img src={`${langIcons[language+'_icon']}`} /></div>,
      // type:'language',
      children:[
        {
          key:'zh',
          name:right?.['zh']??'汉语',
          type:'language',
          active:language==='zh',
          icon:<div key="zh" className="img"><img src={`${langIcons['zh_icon']}`} /></div>,
        },
        {
          key:'en',
          name:right?.['en']??'英语',
          type:'language',
          active:language==='en',
          icon:<div key="en" className="img"><img src={`${langIcons['en_icon']}`} /></div>,
        },
        {
          key:'jp',
          name:right?.['jp']??'日语',
          type:'language',
          active:language==='jp',
          icon:<div key="jp" className="img"><img src={`${langIcons['jp_icon']}`} /></div>,
        },
      ],
    },
    {
      icon:'Setting',
      // name:'主题',
      type:'themeList',
      // arrowDir:'lt',
      children:getThemeList(theme).map(v=>{
        v.key===themeKey&&(v.active=true);
        return v;
      }),
    },
  ];
};

