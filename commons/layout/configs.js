import MainTop from './components/mainTop';
import handleNavClick from './utils/handleNavClick';
import fixIcons from '@app/utils/fixIcons';
import logo from '@app/assets/images/logo.png';
import Link from './components/link';

import useStore,{defStore as store} from '../useStore';

import {routes} from '@app/routers/staticRouter';

import formatMenu from './utils/formatMenu';

const menu=formatMenu(routes);

export {
  MainTop,
  handleNavClick,
  logo,
  fixIcons,
  Link,
  store,
  useStore,
  menu,
};

