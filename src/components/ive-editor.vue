<template>
  <mavon-editor
    class="ive-editor"
    ref='editor'
    :defaultOpen="inEditMode ? 'edit' : 'preview'"
    :toolbarsFlag="inEditMode"
    :toolbars="toolbars"
    :subfield="false"
    :value="value"
    @input="$emit('input', $event)"
    @imgAdd="onImgAdd"
  />
</template>
<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
  name: 'ive-editor',
  props: {
    value: '',
    inEditMode: {
      type: Boolean,
      default: true,
    },
    uploadApi: Function,
  },
  components: {
    mavonEditor,
  },
  data() {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  methods: {
    async onImgAdd (pos, img) {
      if (this.uploadApi) {
        const url = await this.uploadApi(img);
        this.$refs.editor.$img2Url(pos, url);
      } else {
        this.$Message.warning('未配置上传api，无法上传图片！');
      }
    },
  },
};
</script>