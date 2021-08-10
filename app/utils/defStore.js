import {defStore} from '@common/useStore';
import {storage} from '@huxy/utils';
import getI18n from '@app/utils/getI18n';
import getTheme from '@app/utils/getTheme';

const setDefStore=async ()=>{
  storage.set('language','zh');
  const {language,i18ns}=await getI18n();
  defStore.setState({i18ns});
  defStore.setState({'huxy-language':language});
  defStore.setState({'huxy-theme':getTheme(i18ns)});
};

export default setDefStore;
