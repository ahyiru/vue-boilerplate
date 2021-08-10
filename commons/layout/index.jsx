import Layout from './layoutComponent';
import useNavList from './hooks/useNavList';

import * as configs from './configs';

const Index=props=>{
  const {store}=configs;
  const i18ns=store.getState('i18ns');
  const [leftList,rightList]=useNavList({store});
  return ()=><Layout title={i18ns?.title} leftList={leftList} rightList={rightList} {...configs} />;
};

const Frame={
  props:{
    menu:Array,
    current:Array,
    store:Object,
    useStore:Function,
  },
  setup:Index,
};

export default Frame;

