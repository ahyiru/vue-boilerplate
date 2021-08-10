import {
  defaults,
  dark,
  light,
} from './themes';

const themeList=nameList=>[
  {
    name:nameList?.['defaults']??'defaults',
    key:'defaults',
    list:defaults,
    type:'theme',
  },
  {
    name:nameList?.['dark']??'dark',
    key:'dark',
    list:dark,
    type:'theme',
  },
  {
    name:nameList?.['light']??'light',
    key:'light',
    list:light,
    type:'theme',
  },
];

export default themeList;

