<template>
  <div id="app">
    <UI msg="Patienten Stammdaten" />
    <Camera />
  </div>
</template>

<script>
import UI from "./components/UI.vue";
import Camera from "./components/Camera.vue";

export default {
  name: "App",
  components: {
    UI,
    Camera
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
}
</style>
