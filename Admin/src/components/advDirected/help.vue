<template>
  <div class="help">
    <Header :title="title"></Header>
    <div class="content-box">
    </div>

  </div>
</template>
<script>
import Header from "../common/header";
export default {
  name: "Help",
  components: { Header },
  data() {
    return {
      title: "help"
    };
  },
  methods: {}
};
</script>
<style  scoped>
</style>