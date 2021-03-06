# iveModal
## 一、代码示例
### html
```html
<template>
  <Button @click="info">信息窗口</Button>
  <Button @click="confirm">确认窗口</Button>
  <Button @click="prompt">确认窗口带输入控件</Button>
</template>
```
### js

```js
export default {
  methods: {
    info() {
      this.$iveModal.info('这是一条提示信息');
    },
    async confirm() {
      const title = '标题';
      const confirm = await this.$iveModal.confirm(
        `确定删除<b>${title}</b>吗？`,
      );
      if (confirm) {
        confirm.remove();
      }
    },
    async prompt() {
      const confirm = await this.$iveModal.prompt({
        title: `请输入${msg}名`,
        value: '默认值',
      });
      if (confirm) {
        const { value, modal } = confirm;
        console.log(value);
        modal.remove();
      }
    },
  },
}
```
## 二、属性、事件及方法说明
### 方法（methods）
| 方法名 | 说明 | 参数 | 返回值 |
| ------ | ------ | ------ | ------ |
| info | 信息提示弹窗 | 标题 | 无 |
| confirm | 确认弹窗 | 标题 | false \| modal |
| prompt | 确认窗口带输入控件 | title: 标题; value: 默认值 | false \| { value: 用户输入值, modal: modal } |
<p style="color: #999; padding-left: 2em; text-indent: -2em;">注：1.confirm和prompt方法返回结果都为promise，上面说的返回值是await promise之后的返回值；<br>
2.confirm和prompt方法，用户点击了"取消"按钮都会返回false；<br>
3.modal为弹窗实例，因为confirm和prompt方法的“确认”按钮使用了加载圈，需要手动调用modal.remove()来关闭弹窗，故将其返回）</p>