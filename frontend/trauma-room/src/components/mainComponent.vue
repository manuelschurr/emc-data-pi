<template>
  <div>
    <component v-bind:is="component" />
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
      component: null
    };
  },
  mounted() {
    this.$root.$on("selectedComponent", data => {
      if (data === "btn-puls") {
        this.component = PulsOxy;
      } else if (data === "btn-stream") {
        this.component = Stream;
      } else if (data === "btn-position") {
        this.component = Maps;
      } else {
        this.component = null;
      }
    });
  }
};
</script>