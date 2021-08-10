<template>
  <div class="comp-test">
    {{label}}
    <slot>{{count}}</slot>
  </div>
</template>

<script>
  export default {
    name: 'CompTest',
    props: {
      label: {
        type: String,
        default: 'label',
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
