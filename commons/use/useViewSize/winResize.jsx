import {onMounted,onUnmounted} from 'vue';
import {getViewportSize} from '@huxy/utils';
import useRaf from '../useRaf';
const useWinResize=()=>{
  const [state,setState]=useRaf(getViewportSize());
  const handler=()=>setState(getViewportSize());
  onMounted(()=>{
    window.addEventListener('resize',handler,false);
  });
  onUnmounted(()=>{
    window.removeEventListener('resize',handler,false);
  });
  return state;
};
export default useWinResize;
