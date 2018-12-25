import VueTinymce from './Index.vue';

VueTinymce.install = (Vue) => {
  Vue.component('VueTinymce', VueTinymce);
};

if(typeof window !== 'undefined' && window.Vue){
  window.Vue.use(VueTinymce);
}

export default VueTinymce;