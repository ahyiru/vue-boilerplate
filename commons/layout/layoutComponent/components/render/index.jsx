import RenderChild from './renderChild';

export const render=(data,toggle,fixIcons,Link)=>data.map(item=>{
  const {name,path,icon,active,open,children,linkProps}=item;
  const hasChildren=children?.length;
  if(hasChildren){
    return <li key={path||name} onClick={e=>toggle(e,item)} has-children="true" className={open?'open':''}>
      <Link to={path} item={item} /* className={active?'active':''} */ preventDefault {...linkProps}>
        {typeof fixIcons==='function'?fixIcons(icon):icon}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <RenderChild item={item}>{render(children,toggle,fixIcons,Link)}</RenderChild>
    </li>;
  }
  return <li key={path||name}>
    <Link to={path} item={item} /* className={active?'active target':''} */ stopPropagation {...linkProps}>
      {typeof fixIcons==='function'?fixIcons(icon):icon}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});
let timer=0;
export const renderCollapsed=(data,menuRef,fixIcons,Link,level=0)=>data.map(item=>{
  const {name,path,icon,active,children,linkProps}=item;
  const hasChildren=children?.length;
  if(hasChildren){
    const mouseEvents=level?{}:{
      onMouseenter:e=>{
        clearTimeout(timer);
        menuRef.value.style.width='100vw';
      },
      onMouseleave:e=>{
        timer=setTimeout(()=>menuRef.value.style.width='',200);
      },
    };
    return <li key={path||name} has-children="true" {...mouseEvents}>
      <Link to={path} item={item} /* className={active?'active':''} */ preventDefault {...linkProps}>
        {typeof fixIcons==='function'?fixIcons(icon):icon}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <ul>{renderCollapsed(children,menuRef,fixIcons,Link,level+1)}</ul>
    </li>;
  }
  return <li key={path||name}>
    <Link to={path} item={item} /* className={active?'active target':''} */ stopPropagation {...linkProps} title={name}>
      {typeof fixIcons==='function'?fixIcons(icon):icon}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});

