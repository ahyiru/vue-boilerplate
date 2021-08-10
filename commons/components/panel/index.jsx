import {ref} from 'vue';
import Spinner from '../spinner';
import styles from './index.less';

const isValid=plugins=>plugins?.filter?.(item=>typeof item==='function');

const Index=(props,{attrs,slots,emit})=>{
  const panelRef=ref();
  const {loading,title,plugins,className,...rest}=props;
  const validPlugin=isValid(plugins);
  const isValidPlugin=validPlugin?.length;
  const cls=className?` ${className}`:'';
  return ()=><div className={`${styles.panel}${cls}`} {...rest} ref={panelRef}>
    {
      (title||isValidPlugin)&&<div className={styles['panel-header']}>
        {title&&<h4 className={styles['panel-title']}>{title}</h4>}
        {
          isValidPlugin&&<div className={styles['panel-plugins']}>
            {validPlugin.map((Item,i)=><a key={i}><Item panel={panelRef} /></a>)}
          </div>
        }
      </div>
    }
    <div className={styles['panel-body']}>
      {slots.default()}
    </div>
    {loading&&<Spinner />}
  </div>;
};

const Panel={
  props:{
    loading:false,
    title:'',
    plugins:[],
    className:'',
  },
  setup:Index,
};

export default Panel;


