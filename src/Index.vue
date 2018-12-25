<!-- 富文本编辑器 基于 TinyMCE -->
<template>
    <div :class="`mt30 ${loading ? 'loading' : ''}`">
        <div :id="`ueditor${_uid}`" name="content" type="text/plain">
        </div>
    </div>
</template>

<script>
// import tinymce from 'tinymce';
import 'tinymce/tinymce.min.js';
import './zh_CN.js';
import 'tinymce/themes/modern/theme.js';

// plugins
import './plugins.js';

// 加载样式
import 'tinymce/skins/lightgray/content.min.css';
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/plugins/codesample/css/prism.css';

const PLUGINS = ['paste', 'link', 'media', 'preview', 'image', 'imagetools', 'fullpage', 'fullscreen', 'emoticons', 'advlist', 'anchor', 'autolink', 'colorpicker', 'contextmenu', 'directionality', 'hr', 'lists', 'table', 'insertdatetime', 'codesample', 'textcolor', 'searchreplace', 'pagebreak'];

export default {
    name:'',
    data() {
        return {
            tinyEditor: null,
            contentChangeCount: 0,
            loading: false,
        };
    },
    props: {
        value: {
            default: '',
        },
        options: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    watch: {
        value(newValue) {
            // 编辑器已初始化并且第一次进入
            this.tinyEditor && !this.contentChangeCount && this.setContent('watch');
            this.contentChangeCount ++;
        }
    },
    methods: {
        /**
         * 初始化编辑器
         */
        initEditor() {
            tinymce.init(Object.assign({
                selector: `#ueditor${this._uid}`,
                plugins: PLUGINS,
                toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | emoticons',
                importcss_append: true,
                height: 200,
                paste_data_images: true,
                // images_upload_url: `${BASE_URL}/upload`,
                media_live_embeds: true,
                // images_upload_handler: (blobInfo, success, failure) => {
                //     const formData = new FormData();
                //     formData.append('file', blobInfo.blob(), blobInfo.filename());
                //     uploadImageAPI(formData)
                //         .then(response => {
                //             const res = response.data

                //             if (res.code === 1000) {
                //                 success(res.data.url);
                //             } else {
                //                 failure(`Invalid JSON: ${res.msg}`);
                //             }
                //         });
                // },
                video_template_callback: (data) => {
                    return `<iframe width="${data.width}" height="${data.height}" src="${data.source1}" frameborder="1" gesture="media" allow="encrypted-media" allowfullscreen></iframe>`;
                },
                init_instance_callback: (editor) => {
                    editor.on('Change', () => {
                        this.$emit('input', this.tinyEditor.getContent());
                    });
                },
            }, this.options))
            .then(res => {
                this.tinyEditor = tinymce.activeEditor;
                this.setContent();
            });
        },
        /**
         * 设置内容
         */
        setContent() {
            this.tinyEditor.setContent(this.value);
        },
    },
    mounted() {
        this.initEditor();
    },
};
</script>

<style scoped>
.loading {
    height: 200px;
    border: 1px solid #dcdfe6;
}
</style>