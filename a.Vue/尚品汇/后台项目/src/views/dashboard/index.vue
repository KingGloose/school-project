<template>
  <div class="dashboard-container">
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Card from "./Card/index.vue";
import Sale from "./Sale/index.vue";
import Observe from "./Observe/index"

export default {
  name: "Dashboard",
  components: { Card, Sale, Observe },
  mounted(){
    this.$store.dispatch("getData")
  }
  
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: -10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
