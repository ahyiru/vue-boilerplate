import HoriMenu from '../components/horiMenu';
import NavList from '../components/navList';
import './index.less';

const Index=props=>{
  const {store,useStore,navMenu,leftList,rightList,handleNavClick,fixIcons,navMenuStyle,Link}=props;
  return <div className="header">
    <a className="banner" href="/">
      <div className="logo"><img src={props.logo} alt="logo" /></div>
      <div className="title">{props.title}</div>
    </a>
    <div className="nav">
      <div className="nav-wrap">
        {
          navMenu?.length?<HoriMenu menu={navMenu.slice(0,5)} fixIcons={fixIcons} style={navMenuStyle} Link={Link} />:
            <div className="nav-left">
              <NavList list={leftList} click={(item,e)=>handleNavClick(props,item,e)} store={store} useStore={useStore} fixIcons={fixIcons}  />
            </div>
        }
        <div className="nav-right">
          <NavList list={rightList} click={(item,e)=>handleNavClick(props,item,e)} store={store} useStore={useStore} fixIcons={fixIcons}  />
        </div>
      </div>
    </div>
  </div>;
};

export default Index;


