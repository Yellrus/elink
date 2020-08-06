<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="getKey" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    getKey() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  //min-height: calc(100vh - 50px);
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
