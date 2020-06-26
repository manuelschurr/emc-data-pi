<template>
  <div id="app">
    <header/>
  </div>
</template>

<script>
import header from "./components/header.vue";
import mainComponent from "./components/mainComponent.vue";

export default {
  name: "App",
  components: {
    header,
    mainComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
