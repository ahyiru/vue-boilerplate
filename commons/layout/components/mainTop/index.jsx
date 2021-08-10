import { useRoute } from 'vue-router';
import Link from '../link';
import './index.less';

const Index=({leftBar,contentRef})=>{
  const currentRoute = useRoute();
  const current=currentRoute.matched;
  return <div className="main-top">
    {
      leftBar?.length?<ul className="left-bar">
        {
          leftBar.map(item=><li key={item.key}><a className="btn-bar">{item.label}</a></li>)
        }
      </ul>:<ul className="bread">
        {current?.filter(v=>v.name).map(v=><li key={v.path}><Link to={v.path}>{v.name}</Link></li>)}
      </ul>
    }
  </div>;
};

export default Index;



