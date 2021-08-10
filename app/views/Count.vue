<template>
  <div>
    <el-button @click="add()">add {{ num }} </el-button>
  </div>
</template>

<script>
export default {
  name: "Count",
  props: {
    num: Number,
  },
  methods: {
    add() {
      this.$emit("add", 5);
    },
  },
};
</script>
