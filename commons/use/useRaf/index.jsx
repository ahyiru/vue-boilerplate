import {ref,onUnmounted} from 'vue';
const useRaf=(initState={})=>{
  const frame=ref(0);
  const state=ref(initState);
  const setRaf=value=>{
    cancelAnimationFrame(frame.value);
    frame.value=requestAnimationFrame(()=>state.value=value);
  };
  onUnmounted(()=>{
    cancelAnimationFrame(frame.value);
  });
  return [state,setRaf];
};
export default useRaf;
