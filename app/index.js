import {createApp} from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import Icons from '@app/utils/icons';

import '@common/styles/index.less';
import '@app/assets/styles.less';

import router from '@app/routers/staticRouter';

import setDefStore from '@app/utils/defStore';
setDefStore();

const app=createApp(App);

app.use(ElementPlus);
Object.keys(Icons).map(key=>app.component([key],Icons[key]));
app.use(router);
app.mount('#app');

// setDefStore().then(res=>app.use(ElementPlus).use(Icons).use(router).mount('#app'));
