<template>
  <div>
    <div id="test"></div>
    <el-button @click="dl()">download</el-button>
  </div>
</template>

<script>
import { Graph,DataUri } from "@antv/x6";
import "@antv/x6-vue-shape";
import ChangeSize from "./ChangeSize";
import Count from "./Count";

export default {
  data() {
    return {
      nodeData: {
        num: 0,
      },
      graph:null,
    };
  },
  components: {
    ChangeSize,
  },
  mounted() {
    const self = this;
    this.graph = new Graph({
      container: document.getElementById("test"),
      width: '100%',
      height: 600,
      grid: true,
    });

    Graph.registerVueComponent(
      "count-component",
      {
        template: `<count :num="num" @add="add"></count>`,
        data() {
          return self.nodeData;
        },
        methods: {
          add(step) {
            self.nodeData.num += step;
          },
        },
        components: {
          Count,
        },
      },
      true
    );

    this.graph.addNode({
      shape: "vue-shape",
      x: 300,
      y: 100,
      width: 150,
      height: 100,
      attrs: {
        body: {
          stroke: "#ebebeb",
        },
      },
      component: {
        template: `<change-size></change-size>`,
        data() {
          return {};
        },
        components: {
          ChangeSize,
        },
      },
    });

    this.graph.addNode({
      shape: "vue-shape",
      x: 300,
      y: 250,
      width: 150,
      height: 100,
      component: "count-component",
    });
  },
  methods:{
    dl(){
      this.graph.toPNG((dataUri) => {
        DataUri.downloadDataUri(dataUri,'test.png')
      });
    },
  },
};
</script>

<style>

</style>
