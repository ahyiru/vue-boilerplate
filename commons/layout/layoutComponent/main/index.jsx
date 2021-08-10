import {ref,Transition} from 'vue';
import Footer from '../footer';
import Menu from '../menu';
import './index.less';

const Index=props=>{
  const {menu,MainTop,asideStyle,contentStyle,...menuProps}=props;

  const contentRef=ref();

  const slots = {
    default: ({Component}) => {
      return <Transition name="slide-fade">
        <Component />
      </Transition>;
    },
  };

  return ()=><div className="frame-container">
    {
      menu?.length?<aside className="frame-aside" style={asideStyle}>
        <Menu {...menuProps} menu={menu} />
      </aside>:null
    }
    <div className="frame-view" style={menu?.length?null:{paddingLeft:0}}>
      <div className="page-container">
        {MainTop&&<MainTop contentRef={contentRef} />}
        <div className={`page-content`} ref={contentRef} style={contentStyle}>
          <router-view v-slots={slots}></router-view>
        </div>
      </div>
      <footer className="frame-footer">
        <Footer {...props} />
      </footer>
    </div>
  </div>;
};

const Main={
  props:{
    store:Object,
    useStore:Function,
    menu:Array,
    MainTop:Function,
    asideStyle:Object,
    contentStyle:Object,
    fixIcons:Function,
    Link:Object,
  },
  setup:Index,
};

export default Main;



