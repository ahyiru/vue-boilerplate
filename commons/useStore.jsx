import {ref,onMounted} from 'vue';
import {createStore} from '@huxy/utils';
export const defStore=createStore();
const Index=(store=defStore,name,initState)=>{
  const state=ref(store.getState(name)??initState);
  const update=result=>store.setState({[name]:result});
  const subscribe=callback=>store.subscribe(name,result=>callback(result));
  onMounted(()=>{
    store?.subscribe(name,result=>state.value=result);
  });
  return [state,update,subscribe];
};

export default Index;


