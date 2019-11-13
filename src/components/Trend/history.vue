<template>
  <div class="history-trend">
    <Header :title="title"></Header>

  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "History",
  components: { Header },
  data() {
    return {
      title: "历史趋势"
    };
  },
  methods: {}
};
</script>
<style  scoped>
</style>