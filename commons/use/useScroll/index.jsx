import {onMounted,onUnmounted} from 'vue';
import {isElement,getOffset} from '@huxy/utils';
import useRaf from '../useRaf';
const useScroll=(element=null)=>{
  const listener=isElement(element)?element:window;
  const [state,setState]=useRaf(getOffset(element));
  const handler=()=>setState(getOffset(element));
  onMounted(()=>{
    listener.addEventListener('scroll',handler,{capture:false,passive:true});
  });
  onUnmounted(()=>{
    listener.removeEventListener('scroll',handler);
  });
  return state;
};
export default useScroll;
