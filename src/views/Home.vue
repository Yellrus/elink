<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <router-link to="/profile">
      <el-button type="default">Перейти к About</el-button>
    </router-link>
    <el-input v-model="input" placeholder=""></el-input>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data: () => ({
    input: '',
  }),
};
</script>
