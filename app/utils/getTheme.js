import getThemeList from '@app/configs/theme';
import {storage} from '@huxy/utils';

const getTheme=i18ns=>{
  const themeList=typeof getThemeList==='function'?getThemeList(i18ns?.theme):[];
  const theme=storage.get('theme')||themeList[0]||{};
  return theme;
};

export default getTheme;

