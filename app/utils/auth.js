import {storage} from '@huxy/utils';

// import logoutFn from '@app/utils/logoutFn';

// import configs from '@app/configs';

export const logout=isLogout=>{
  // !isLogout&&logoutFn();
  storage.rm('token');
  // location.href=configs.browserRouter?'/user/signin':'#/user/signin';
  location.href='/';
};

export const isAuthed=()=>storage.get('token');
