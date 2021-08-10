import {onMounted,onUnmounted} from 'vue';
import {getViewportSize,resize,hasProp} from '@huxy/utils';
import useRaf from '../useRaf';
const useEleResize=(ref=null,delay=60)=>{
  const element=hasProp(ref,'value')?ref.value:ref;
  const {bind,destroy}=resize(element,delay);
  const [state,setState]=useRaf(getViewportSize(element));
  const handler=()=>setState(getViewportSize(element));
  onMounted(()=>{
    bind(handler);
  });
  onUnmounted(()=>{
    destroy();
  });
  return state;
};
export default useEleResize;
