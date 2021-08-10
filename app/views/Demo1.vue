<template>
  <div>
    <div id="container"></div>
    <el-button @click="dl()">download</el-button>
  </div>
</template>

<script>
// import { Graph, Node, Platform, Dom, DataUri } from "@antv/x6";
// import "@antv/x6-vue-shape";
// import ChangeSize from "./ChangeSize";
// import Count from "./Count";

export default {
  data() {
    return {
      graph:null,
    };
  },
  mounted() {
    
  },
  methods:{
    dl(){
      console.log(111);
    },
  },
};
</script>

<style>

</style>
