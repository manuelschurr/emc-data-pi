<template>
  <div>
    <b-button-group vertical>
      <b-button @click="setSelection($event)" id="btn-puls"
        >Puls Oxy <br />
        Puls: 192 <br />
        SpO2: 98</b-button
      >
      <b-button @click="setSelection($event)" id="btn-stream"
        >Live Bild</b-button
      >
      <b-button @click="setSelection($event)" id="btn-position"
        >Position <br />
        ETA: 5 min</b-button
      >
    </b-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showComponent: false,
      pastEvent: null,
      selection: []
    };
  },
  methods: {
    setSelection(event) {
      if (!this.showComponent || event.currentTarget.id !== this.pastEvent) {
        //this.selection.push(event.currentTarget.id);
        this.$root.$emit("selectedComponent", event.currentTarget.id);
        this.showComponent = true;
        this.pastEvent = event.currentTarget.id;
      } else if (event.currentTarget.id == this.pastEvent) {
        this.$root.$emit("selectedComponent", null);
        this.showComponent = false;
        this.pastEvent = event.currentTarget.id;
      }
    }
  }
};
</script>