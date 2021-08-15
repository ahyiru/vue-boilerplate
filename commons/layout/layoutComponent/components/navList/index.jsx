import {ref} from 'vue';
import {traverItem} from '@huxy/utils';
import useClickAway from '@common/use/useClickAway';

const setupNavItem=({item,click,store,useStore,fixIcons})=>{
  const [collapsed]=useStore(store,'huxy-collapse');
  const navRef=ref();
  const open=ref(false);
  useClickAway(navRef,e=>open.value=false);
  const {Custom,img,name,icon,children,Ricon,active,arrowDir,ChildRender}=item;
  const hasChildren=children?.length;
  const toggleNav=(e,item)=>{
    // e.stopPropagation();
    open.value=!open.value;
    click(e,item);
  };
  const itemClick=(e,item,isChild=false)=>{
    open.value=false;
    click(e,item,isChild);
  };
  return ()=>{
    const ri=Ricon===true?<i className={`huxy-angle-${open.value?'top':'bt'}`} />:(Ricon?<Ricon status={open} />:null);
    const itemEl=Custom?<Custom collapsed={collapsed} />:img?<div className="avatar">
      <div className="img"><img src={img} crossOrigin="anonymous" alt="avatar" /></div>
      {name?<span className="txt">{name}</span>:null}
      {ri}
    </div>:<>
      {typeof fixIcons==='function'?fixIcons(icon):icon}
      {name?<span className="txt">{name}</span>:null}
      {ri}
    </>;
    return (hasChildren||ChildRender)?<li ref={navRef}>
      <a onClick={e=>toggleNav(e,item)} className={active?'active':''}>{itemEl}</a>
      <ul className={`huxy-arrow-${arrowDir||'rt'}${open.value?' show':''}`}>
        {
          hasChildren?children.map((v,k)=><li key={`subItem-${k}-${v.name}`}>
            <a onClick={e=>itemClick(e,v,true)} className={v.active?'active':''}>
              {typeof fixIcons==='function'?fixIcons(v.icon):v.icon}
              <span style={{display:'inline-block'}}>{v.name}</span>
            </a>
          </li>):<li><ChildRender status={open.value} /></li>
        }
      </ul>
    </li>:<li>
      <a onClick={e=>itemClick(e,item)} className={active?'active':''} title={item.title||name}>{itemEl}</a>
    </li>;
  };
};
const NavItem={
  props:{
    item:Object,
    click:Function,
    store:Object,
    useStore:Function,
    fixIcons:Function,
  },
  setup:setupNavItem,
};


const Index=({list,click,store,useStore,fixIcons})=>{
  const updateList=item=>{
    const newData=traverItem(v=>{
      if(item.name===v.name){
        v.active=!item.active;
      }else{
        v.active=false;
      }
    })(list.value);
    list.value=newData;
  };
  const handleClick=(e,item,update)=>{
    if(update){
      updateList(item);
    }
    click(item,e);
  };
  return <ul>
    {
      list.value.map((v,k)=><NavItem key={`navItem-${k}-${v.name}`} click={handleClick} item={v} store={store} useStore={useStore} fixIcons={fixIcons} />)
    }
  </ul>;
};

export default Index;


