<template>
  <div>
    <p>aaaaaaaaa</p>
    <div>
      <!-- 默认插槽 -->
      <!-- <slot></slot> -->

      <!-- 备用内用 -->
      <!-- <slot>哈哈哈哈</slot> -->
      <!-- 具名插槽 -->
      <!-- <slot name="content">底部</slot> -->

     <slot name="content" :pn="pageName" test="测试">备用内容</slot>
    </div>
    <p>
      <slot name="footer">底部</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '张三'
    }
  }
}
</script>

<style>
</style>
