<template>
  <div class="page-panel">
    <comp-table :tableData="tableData" :header="header" />
  </div>
</template>

<script>
import CompTable from '@app/components/table';
export default {
  components:{
    CompTable,
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      header:[
        {
          label:'日期',
          prop:'date',
        },
        {
          label:'姓名',
          prop:'name',
        },
        {
          label:'地址',
          prop:'address',
        },
        {
          label:'操作',
          prop:'actions',
          render:[
            {
              size:'mini',
              label:'编辑',
              click:()=>{},
            },
            {
              size:'mini',
              type:'danger',
              label:'删除',
              click:()=>{},
            },
          ],
        },
      ],
      actions:[
        {
          label:'操作',
          prop:'actions',
          render:[
            {
              size:'mini',
              label:'编辑',
              click:this.handleEdit,
            },
            {
              size:'mini',
              type:'danger',
              label:'删除',
              click:this.handleDelete,
            },
          ],
        },
      ],
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
