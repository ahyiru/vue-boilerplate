import {logout} from '@app/utils/auth';
import './index.less';
const NotFound=props=>{
  return <div className="not-found">
    <div className="content">
      <h2><b style={{color:'red'}}>path</b> is not found.</h2>
      <h2>返回<a onClick={e=>location.href='/'}>首页</a></h2>
      <h2><a onClick={e=>logout()}>切换用户</a></h2>
    </div>
  </div>;
};

export default NotFound;
