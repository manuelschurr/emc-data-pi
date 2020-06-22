<template>
  <div id="app">
    <Header/>
    <PatientData/>
    <RightSidebar/>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import PatientData from "./components/patientData.vue";
import RightSidebar from "./components/rightSidebar";

//import MainComponent from "./components/mainComponent.vue";

export default {
  name: "App",
  components: {
    Header,
    PatientData,
    RightSidebar
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
