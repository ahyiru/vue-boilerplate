import {ref,onMounted,watch} from 'vue';

const Index=({item},{attrs,slots,emit})=>{
  const ul=ref();
  onMounted(()=>{
    const el=ul.value;
    const height=item.open?`${el.scrollHeight}px`:'0px';
    el.style.maxHeight=height;
  });
  watch([()=>item.open,()=>item.children?.length],([open,prevOpen],[len,prevLen])=>{
    const el=ul.value;
    const initH=open?'0px':`${el.scrollHeight}px`;
    el.style.maxHeight=initH;
    setTimeout(()=>{
      const height=open?`${el.scrollHeight}px`:'0px';
      el.style.maxHeight=height;
    },5);
  });
  watch(()=>item.uuid,(uuid,prevUuid)=>{
    if(uuid){
      ul.value.style.maxHeight='';
    }
  });
  return ()=><ul ref={ul}>{slots.default()}</ul>;
};

const RenderChild={
  props:{
    item:Object,
  },
  setup:Index,
};

export default RenderChild;