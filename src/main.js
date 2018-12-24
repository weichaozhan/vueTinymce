import Vue from 'vue';

import App from './App.vue';
import VueTinymce from '../dist/vue-tinymce';

// Vue.use(VueTinymce);
console.log(VueTinymce)

new Vue({
    render: h => h(App)
}).$mount('#app');