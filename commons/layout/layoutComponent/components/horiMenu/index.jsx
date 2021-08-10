import './index.less';
const render=(data,fixIcons,Link)=>data.value.map(item=>{
  const {name,path,icon,active,open,children,linkProps}=item;
  const hasChildren=children&&children.length;
  if(hasChildren){
    return <li key={path||name} has-children="true">
      <Link to={path} className={active?'active':''} preventDefault {...linkProps}>
        {typeof fixIcons==='function'?fixIcons(icon):icon}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <ul>{render(children,fixIcons,Link)}</ul>
    </li>;
  }
  return <li key={path||name}>
    <Link to={path} className={active?'active target':''} stopPropagation {...linkProps}>
      {typeof fixIcons==='function'?fixIcons(icon):icon}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});
const Index=({menu,fixIcons,Link,...rest})=>{
  const {float,...restStyle}=rest?.style??{};
  const menuStyle=float?{'--menuFloat':float,...restStyle}:restStyle;
  return <div className="nav-menu" {...rest} style={menuStyle}>
    <div className="menu-track">
      <ul className="tree-root">
        {render(menu,fixIcons,Link)}
      </ul>
    </div>
  </div>;
};

export default Index;

