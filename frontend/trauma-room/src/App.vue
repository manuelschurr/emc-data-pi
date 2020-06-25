<template>
  <div id="app">
    <Header />
    <PatientData />
    <b-container fluid align-v="stretch">
      <b-row>
        <b-col cols="2"><LeftSidebar /></b-col>
        <b-col cols="8"><MainComponent /></b-col>
        <b-col cols="2"><RightSidebar /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import PatientData from "./components/patientData.vue";
import RightSidebar from "./components/rightSidebar.vue";
import LeftSidebar from "./components/leftSidebar.vue";
import MainComponent from "./components/mainComponent.vue";

//import MainComponent from "./components/mainComponent.vue";

export default {
  name: "App",
  components: {
    Header,
    PatientData,
    RightSidebar,
    LeftSidebar,
    MainComponent,

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
  min-height: 100vh;
}
</style>
