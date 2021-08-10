<template>
  <div class="events-container">
    <h2 class="title">{{configs?.title}}</h2>
    <el-icon>
      <edit />
    </el-icon>
  </div>
</template>

<script>
import { add } from "./utils/add";
import { configs } from "./utils/eventConfigs";
import CompTest from "./comp1";
export default {
  name: 'Test1',
  data() {
    return {
      configs,
    };
  },
  computed: {
    
  },
  mounted() {},
  methods:{
    handle1(){
      this.num=add(this.num,this.currentStep);
    },
  },
};
</script>

<style lang="less" scoped>
  .events-container {
    .title{
      margin:0;
    }
  }
</style>
