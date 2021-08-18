<template>
  <div class="component-table">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column v-for="item in header" :key="item.prop" v-bind="item">
        <template #default="scope" v-if="item.render">
          <el-button v-for="action in item.render" :key="action.label" v-bind="action" @click="action.click(scope.$index,scope.row)">{{action.label}}</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column v-for="action in actions" :key="action.prop" v-bind="action">
        <template #default="scope">
          <el-button size="mini" @click="action.handle(scope.$index, scope.row)">{{action.label}}</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>

export default {
  props:{
    tableData:{
      type:Array,
      default:[],
    },
    header:{
      type:Array,
      default:[],
    },
    pagination:{
      type:Object,
      default:{},
    },
    searchParams:{
      type:Object,
      default:{},
    },
    actions:{
      type:Object,
      default:{},
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style scoped>
.page-panel {
  background:#fff;
  font-size: 16px;
  color: #333;
  padding: 12px;
}
</style>
