<template>
  <div class="test1-container">
    <div>
      <label>step：</label>
      <input v-model="step" placeholder="0">
    </div>
    <button @click="handle1">test1</button>
    <h1 v-if="num>0" :style="{color}">{{num}}</h1>
    <comp-test v-else label="小于0：">
      <h1 :style="{color}">{{num}}</h1>
    </comp-test>
  </div>
</template>

<script>
  import { add } from "./utils/add";
  import CompTest from "./comp1";
  export default {
    name: 'Test1',
    props: {
      count: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        num: this.count,
        step: 2,
        color: 'red',
      };
    },
    computed: {
      currentStep(){
        return this.step-0;
      },
    },
    components: {
      CompTest,
    },
    mounted() {},
    methods:{
      handle1(){
        this.num=add(this.num,this.currentStep);
      },
    },
  };
</script>

<style scoped>
  .test1-container {
    font-size: 16px;
    color: #333;
    padding: 12px;
  }
</style>
