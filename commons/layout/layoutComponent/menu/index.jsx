import {ref} from 'vue';
import {getSelected,uuidv4} from '@huxy/utils';
import useClickAway from '@common/use/useClickAway';
import useWinResize from '@common/use/useViewSize/winResize';
import {render,renderCollapsed} from '../components/render';
import './index.less';

const Index=props=>{
  const {store,useStore,menu,MenuTop,menuStyle,fixIcons,Link}=props;
  const [collapsed,setCollapsed]=useStore(store,'huxy-collapse');
  // const {width}=useWinResize().value;
  const viewSize=useWinResize();
  const menuRef=ref();
  useClickAway(menuRef,e=>{
    if(viewSize.value.width<1024&&collapsed.value){
      setCollapsed(false);
    }
  });
  const toggle=(e,v)=>{
    e.stopPropagation();
    const selecteds=getSelected(menu,v.path,'path');
    selecteds.map(item=>item.path===v.path?item.open=!item.open:item.uuid=uuidv4());
  };
  return ()=>{
    return <div className="menu" ref={menuRef} style={menuStyle}>
      {MenuTop&&<MenuTop {...props} />}
      <div className="menu-track">
        <ul className="tree-root">
          {viewSize.value.width>1024&&collapsed.value?renderCollapsed(menu,menuRef,fixIcons,Link):render(menu,toggle,fixIcons,Link)}
        </ul>
      </div>
    </div>;
  };
};

const Menu={
  props:{
    store:Object,
    useStore:Function,
    menu:Array,
    menuStyle:Object,
    MenuTop:Function,
    fixIcons:Function,
    Link:Object,
  },
  setup:Index,
};

export default Menu;


