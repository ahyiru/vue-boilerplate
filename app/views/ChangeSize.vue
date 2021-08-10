<template>
  <div class="container">
    <el-button @click="changeSize()">change size</el-button>
  </div>
</template>

<script>
export default {
  name: "ChangeSize",
  props: {
    size: Number,
  },
  inject: ["getNode"],
  methods: {
    changeSize() {
      const node = this.getNode();
      const size = node.size();
      node.size(size.width + 5, size.height + 5);
    },
  },
};
</script>
<style>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>