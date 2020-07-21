<template>
  <div class="container-fluid">
    <div v-if="componentArray.length === 1">
      <div v-for="child in componentArray" :key="child.name">
        <component :is="child" :Rtwdocument="Rtwdocument"></component>
      </div>
    </div>
    <!-- <div v-if="componentArray.length === 2">
      <div class="col-6">
        <component v-bind:is="componentOne" :Rtwdocument="Rtwdocument" />
      </div>
      <div class="col-6">
        <component v-bind:is="componentTwo" :Rtwdocument="Rtwdocument" />
      </div>
    </div>
    <div v-if="componentArray.length === 3">
      <div class="col-4">
        <component v-bind:is="componentOne" :Rtwdocument="Rtwdocument" />
      </div>
      <div class="col-4">
        <component v-bind:is="componentTwo" :Rtwdocument="Rtwdocument" />
      </div>
      <div class="col-4">
        <component v-bind:is="componentThree" :Rtwdocument="Rtwdocument" />
      </div>
    </div> -->
  </div>
</template>

<script>
import PulsOxy from "./pulsOxy.vue";
import Stream from "./stream.vue";
import Maps from "./maps.vue";
//import MainComponent from "./components/mainComponent.vue";
export default {
  components: {
    PulsOxy,
    Stream,
    Maps
  },
  data() {
    return {
      componentArray: [],
      componentOne: null,
      componentTwo: null,
      componentThree: null
    };
  },
  props: {
    Rtwdocument: Object
  },
  mounted() {
    this.$root.$on("selectedComponent", data => {
      this.componentArray = [];
      for (var d of data) {
        console.log(d);
        if (d === "btn-puls") {
          this.componentArray.push(PulsOxy);
        }
        if (d === "btn-stream") {
          this.componentArray.push(Stream);
        }
        if (d === "btn-position") {
          this.componentArray.push(Maps);
        }
      }

      /*         console.log(d)
        console.log(index)
        if (d === "btn-puls") {
          if (index === 0) {
            this.componentOne = PulsOxy;
          } else if (index === 1) {
            this.componentTwo = PulsOxy;
          } else if (index === 2) {
            this.componentThree = PulsOxy;
          }
        } else if (d === "btn-stream") {
          if (index === 0) {
            this.componentOne = Stream;
          } else if (index === 1) {
            this.componentTwo = Stream;
          } else if (index === 2) {
            this.componentThree = Stream;
          }
        } else if (d === "btn-position") {
          if (index === 0) {
            this.componentOne = Maps;
          } else if (index === 1) {
            this.componentTwo = Maps;
          } else if (index === 2) {
            this.componentThree = Maps;
          }
        } */
    });
  }
};
</script>