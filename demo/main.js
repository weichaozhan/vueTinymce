import Vue from 'vue';

import App from './App.vue';
import VueTinymce from '../src/index';

Vue.use(VueTinymce);

new Vue({
    render: h => h(App)
}).$mount('#app');