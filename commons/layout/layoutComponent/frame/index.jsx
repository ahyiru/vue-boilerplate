import {a2o,traverItem} from '@huxy/utils';
import useWinResize from '@common/use/useViewSize/winResize';
import Header from '../header';
import Main from '../main';
import './index.less';
import {watch,reactive} from 'vue';
import { useRoute } from 'vue-router';

const resetMenu=(menu,matched)=>{
  traverItem(item=>{
    item.open=undefined;
    item.active=undefined;
  })(menu);
  const setActive=(node,matched)=>{
    const sel=node.find(item=>item.path===matched[0].path);
    if(sel){
      sel.open=true;
      sel.active=true;
      const newMatched=matched.slice(1);
      if(newMatched.length){
        setActive(sel.children,newMatched);
      }
    }
  };
  setActive(menu,matched);
  return menu;
};

const formatMenu=(menu,curPath,type='sideMenu',cb=null)=>{
  const menuConfig={
    sideMenu:null,
    navMenu:null,
  };
  if(type==='navMenu'){
    menuConfig[type]=menu.length>1?menu:menu[0]?.children;
    return menuConfig;
  }
  const navMenu=menu.map(v=>{
    const {children,...rest}=v;
    if(v.path===curPath){
      menuConfig.sideMenu=children;
    }
    return rest;
  });
  menuConfig.navMenu=menu.length>1?navMenu:null;
  return menuConfig;
};

const Index=props=>{
  const currentRoute=useRoute();
  const current=currentRoute.matched;
  const {store,useStore,menu,headerStyle}=props;
  const {width}=useWinResize().value;
  const defMenuType=props.menuType||'sideMenu';

  const [collapsed]=useStore(store,'huxy-collapse');
  const [theme]=useStore(store,'huxy-theme');
  const [menuType]=useStore(store,'huxy-menuType',defMenuType);

  const menus=reactive({menu:resetMenu(menu,current)});

  watch(currentRoute,curRouter=>{
    const {matched}=curRouter;
    resetMenu(menus.menu,matched);
  });
  
  const {sideMenu,navMenu}=formatMenu(menus.menu,current[0]?.path,menuType.value);

  const {title,logo,leftList,rightList,handleNavClick,...mainProps}=props;

  return ()=><div className={`frame ${theme.value?.key??''}${collapsed.value?' collapsed':''}`} style={a2o(theme.value?.list)}>
    <header className="frame-header" style={headerStyle}>
      <Header {...props} navMenu={width<768?[]:navMenu} />
    </header>
    <main className="frame-main">
      <Main {...mainProps} menu={width<768?menus.menu:sideMenu} />
    </main>
  </div>;
};

const Frame={
  props:{
    menu:Array,
    store:Object,
    useStore:Function,
    headerStyle:Object,
    title:String,
    logo:String,
    leftList:Object,
    rightList:Object,
    MainTop:Function,
    handleNavClick:Function,
    fixIcons:Function,
    Link:Object,
  },
  setup:Index,
};

export default Frame;

