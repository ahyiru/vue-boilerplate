import {ref} from 'vue';
import {leftNav,rightNav} from '@app/configs/nav';

const useNavList=props=>{
  const {store}=props;
  // const i18ns=store.getState('i18ns');

  const leftList=ref(leftNav?.({store}));
  const rightList=ref(rightNav?.({store}));

  return [leftList,rightList];
};

export default useNavList;


