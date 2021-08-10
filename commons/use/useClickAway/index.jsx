import {onMounted,onUnmounted} from 'vue';
const useClickAway=(elRef,handleEvent,events='click')=>{
  const handler=event=>{
    const el=elRef?.value??elRef;
    if(el?.contains&&!el.contains(event.target)){
      handleEvent(event);
    }
  };
  onMounted(()=>{
    document.addEventListener(events,handler,false);
  });
  onUnmounted(()=>{
    document.removeEventListener(events,handler,false);
  });
};

export default useClickAway;

