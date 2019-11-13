<template>
  <div class="update-trend">
    <Header :title="title"></Header>

  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "Update",
  components: { Header },
  data() {
    return {
      title: "实时趋势"
    };
  },
  methods: {}
};
</script>
<style  scoped>
</style>