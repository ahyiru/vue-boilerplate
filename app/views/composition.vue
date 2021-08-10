<template>
  <div class="page">
    <div class="title">{{title}}</div>
    <div class="list" v-for="list in analysisList" :key="list.value">
      <h4>{{list.label}}</h4>
      <div class="item">
        <el-select v-model="typeSelected" placeholder="请选择">
          <el-option
            v-for="item in analysisType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, reactive, toRef, toRefs, watch } from 'vue';
import {title,analysisList,analysisType,eventList,eventStatistics,userAttrs,stringAttrs,timeAttrs,booleanAttrs,intAttrs,arrAttrs} from './eventConfigs';
export default {
  setup() {
    const typeSelected=ref('event');
    // const typeSelected=ref('');
    // const typeSelected=ref('');
    // const typeSelected=ref('');
    // const typeSelected=ref('');
    // const typeSelected=ref('');

    watch(()=>typeSelected.value,(currentValue,prevValue,onInvalidate)=>{
      console.log(currentValue,prevValue);
    });

    return {title,analysisType,typeSelected };
  },
};
</script>

<style lang="less" scoped>
.title{
  font-size:18px;
  font-weight:600;
}
</style>

