<template>
  <div id="app">
    <RtwSelection v-if="!rtwSelected" :selectRTW="selectRTW" />
    <div v-if="rtwSelected">
      <Header :changeRTW="changeRTW" />
      <PatientData />
      <div class="container-fluid" v-if="rtwSelected">
        <div class="row align-items-start">
          <div class="col-2">
            <LeftSidebar />
          </div>
          <div class="col-8">
            <MainComponent />
          </div>
          <div class="col-2">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import PatientData from "./components/patientData.vue";
import RightSidebar from "./components/rightSidebar.vue";
import LeftSidebar from "./components/leftSidebar.vue";
import MainComponent from "./components/mainComponent.vue";
import RtwSelection from "./components/rtwSelection.vue";
//import MainComponent from "./components/mainComponent.vue";
export default {
  name: "App",
  data() {
    return {
      rtwSelected: false
    };
  },
  components: {
    Header,
    PatientData,
    RightSidebar,
    LeftSidebar,
    MainComponent,
    RtwSelection
  },
  methods: {
    changeRTW: function() {
      this.rtwSelected = !this.rtwSelected;
    },
    selectRTW: function() {
      this.rtwSelected = !this.rtwSelected;
    }
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