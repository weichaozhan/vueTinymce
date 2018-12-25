# 富文本编辑器 tinymce 的 vue 插件

**props**

```javascript
    value // 绑定的表单
    options // tinymce 初始化属性
```

**demo**
```javascript
    // main.js
    import VueTinymce from '../src/index'

    Vue.use(VueTinymce)

    // 使用
    <vue-tinymce v-model="model" :options="{}"></vue-tinymce>
```