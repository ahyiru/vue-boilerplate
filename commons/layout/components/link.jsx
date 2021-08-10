import { useRouter } from 'vue-router';
const setupLink=(props,{attrs,slots,emit})=>{
  const router = useRouter();
  const {to,onClick,preventDefault,stopPropagation,item,...rest}=props;
  const handleClick=e=>{
    if(rest?.disabled){
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if(!rest?.target){
      e.preventDefault();
      if(!preventDefault){
        router.push(typeof to==='string'?{path:to}:{...to});
      }
    }
    if(stopPropagation){
      e.stopPropagation();
    }
    if(typeof onClick==='function'){
      onClick();
    }
  };
  return ()=>{
    const cls=item?.active?item?.children?.length?'active':'active target':'';
    return <a onClick={e=>handleClick(e)} href={to?.path??typeof to==='string'?to:''} {...rest} className={cls}>{slots.default()}</a>;
  };
};

const Link={
  props:{
    to:Object|String,
    preventDefault:Boolean,
    stopPropagation:Boolean,
    onClick:Function,
    style:Object,
    className:String,
    item:Object,
  },
  setup:setupLink,
};

export default Link;
